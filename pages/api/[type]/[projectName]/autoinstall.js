import projects from 'data/projects'
import { fetchNetInfo, fetchSnap, fetchStatus } from '@utils/fetchProject.js'

export default function handler(req, res) {
	const {
		query: { type, projectName }
	} = req

	const project = projects[type][projectName]
	const {
		bin,
		path,
		peerID,
		seedID,
		seedPort,
		peerPort,
		unsafeReset,
		chainID,
		installBin,
		VAR,
		minGasPrice,
		denom
	} = project
	const name = projectName
	let livePeers = []

	const netInfo = () => {
		fetchNetInfo(name, type)
			.then(info => {
				const peers = info.peers
				const letters = /[a-zA-Z]/

				peers.map(peer => {
					if (peer.is_outbound === true) {
						let ip = peer.remote_ip
						const id = peer.node_info.id
						const listen_addr = peer.node_info.listen_addr

						if (letters.test(ip)) {
							ip = `[${ip}]`
						}

						let i = listen_addr.length - 1
						let port = ''

						while (listen_addr[i] !== ':') {
							port += listen_addr[i]
							i--
						}
						port = port.split('').reverse().join('')
						livePeers.push(`${id}@${ip}:${port}`)
					}
				})
				livePeers.unshift('')
				livePeers = livePeers.join()
			})
			.catch(err => {
				console.log(err)
			})
	}

	netInfo()

	let PEERS = '""',
		SEEDS = '""'
	if (peerID) {
		PEERS = `"${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"`
	}
	if (seedID) {
		SEEDS = `"${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}"`
	}

	res.status(200).send(`#!/bin/bash
source <(curl -s https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/common.sh)

printLogo

read -p "Enter WALLET name:" WALLET
echo 'export WALLET='$WALLET
read -p "Enter your MONIKER :" MONIKER
echo 'export MONIKER='$MONIKER
read -p "Enter your PORT (for example 17, default port=26):" PORT
echo 'export PORT='$PORT

# set vars
echo "export WALLET="$WALLET"" >> $HOME/.bash_profile
echo "export MONIKER="$MONIKER"" >> $HOME/.bash_profile
echo "export CHAIN_ID="${chainID}"" >> $HOME/.bash_profile
echo "export PORT="$PORT"" >> $HOME/.bash_profile
source $HOME/.bash_profile

printLine
echo -e "Moniker:        \\e[1m\\e[32m$MONIKER\\e[0m"
echo -e "Wallet:         \\e[1m\\e[32m$WALLET\\e[0m"
echo -e "Chain id:       \\e[1m\\e[32m$CHAIN_ID\\e[0m"
echo -e "Node custom port:  \\e[1m\\e[32m$PORT\\e[0m"
printLine
sleep 1

printGreen "1. Installing go..." && sleep 1
# install go, if needed
cd $HOME
! [ -x "$(command -v go)" ] && {
VER="1.20.1"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source $HOME/.bash_profile
}
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin

echo $(go version) && sleep 1

source <(curl -s https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/dependencies_install)

printGreen "4. Installing binary..." && sleep 1
# download binary
${installBin}

printGreen "5. Configuring and init app..." && sleep 1
# config and init app
${bin} config node tcp://localhost:\${${VAR}_PORT}657
${bin} config keyring-backend os
${bin} config chain-id ${chainID}
${bin} init "$MONIKER" --chain-id ${chainID}
sleep 1
echo done

printGreen "6. Downloading genesis and addrbook..." && sleep 1
# download genesis and addrbook
wget -O $HOME/${path}/config/genesis.json https://${type}-files.itrocket.net/${name}/genesis.json
wget -O $HOME/${path}/config/addrbook.json https://${type}-files.itrocket.net/${name}/addrbook.json
sleep 1
echo done

printGreen "7. Adding seeds, peers, configuring custom ports, pruning, minimum gas price..." && sleep 1
# set seeds and peers
SEEDS=${SEEDS}
PEERS=${PEERS}
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/; s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${path}/config/config.toml

# set custom ports in app.toml
sed -i.bak -e "s%^address = \\"tcp://0.0.0.0:1317\\"%address = \\"tcp://0.0.0.0:\${${VAR}_PORT}317\\"%;
s%^address = \\":8080\\"%address = \\":\${${VAR}_PORT}080\\"%;
s%^address = \\"0.0.0.0:9090\\"%address = \\"0.0.0.0:\${${VAR}_PORT}090\\"%; 
s%^address = \\"0.0.0.0:9091\\"%address = \\"0.0.0.0:\${${VAR}_PORT}091\\"%; 
s%^address = \\"0.0.0.0:8545\\"%address = \\"0.0.0.0:\${${VAR}_PORT}545\\"%; 
s%^ws-address = \\"0.0.0.0:8546\\"%ws-address = \\"0.0.0.0:\${${VAR}_PORT}546\\"%" $HOME/${path}/config/app.toml


# set custom ports in config.toml file
sed -i.bak -e "s%^proxy_app = \\"tcp://127.0.0.1:26658\\"%proxy_app = \\"tcp://127.0.0.1:\${${VAR}_PORT}658\\"%; 
s%^laddr = \\"tcp://127.0.0.1:26657\\"%laddr = \\"tcp://0.0.0.0:\${${VAR}_PORT}657\\"%; 
s%^pprof_laddr = \\"localhost:6060\\"%pprof_laddr = \\"localhost:\${${VAR}_PORT}060\\"%;
s%^laddr = \\"tcp://0.0.0.0:26656\\"%laddr = \\"tcp://0.0.0.0:\${${VAR}_PORT}656\\"%;
s%^external_address = \\"\\"%external_address = \\"$(wget -qO- eth0.me):\${${VAR}_PORT}656\\"%;
s%^prometheus_listen_addr = \\":26660\\"%prometheus_listen_addr = \\":\${${VAR}_PORT}660\\"%" $HOME/${path}/config/config.toml

# config pruning
sed -i -e "s/^pruning *=.*/pruning = \\"nothing\\"/" $HOME/${path}/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"100\\"/" $HOME/${path}/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \\"50\\"/" $HOME/${path}/config/app.toml

# set minimum gas price, enable prometheus and disable indexing
sed -i 's/minimum-gas-prices =.*/minimum-gas-prices = "${minGasPrice}${denom}"/g' $HOME/${path}/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/${path}/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/${path}/config/config.toml
sleep 1
echo done

# create service file
sudo tee /etc/systemd/system/${bin}.service > /dev/null <<EOF
[Unit]
Description=${projectName} node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/${path}
ExecStart=$(which ${bin}) start --home $HOME/${path}
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF

printGreen "8. Downloading snapshot and starting node..." && sleep 1
# reset and download snapshot
${bin} ${unsafeReset} --home $HOME/${path}
curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

# enable and start service
sudo systemctl daemon-reload
sudo systemctl enable ${bin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`)
}
