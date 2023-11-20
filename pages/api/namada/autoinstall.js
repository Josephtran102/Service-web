import projects from 'data/projects'
import { fetchNetInfo } from '@utils/fetchProject.js'

export default function handler(req, res) {
	res.setHeader('Cache-Control', 'no-store, max-age=0')

	const projectName = 'namada'
	const type = 'testnet'

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
		variable,
		minGasPrice,
		denom,
		goVersion,
		newExecStart,
		newInit
	} = project
	const name = projectName

	const execStart = newExecStart == undefined ? `$(which ${bin}) start --home $HOME/${path}` : newExecStart
	let init = ''

	if (newInit !== 'false') {
		init = newInit == undefined ? `${bin} init "$MONIKER" --chain-id ${chainID}` : newInit
	}

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
read -p "Enter your ALIAS :" ALIAS
echo 'export ALIAS='$ALIAS
read -p "Are you a PostGenesis validator? Enter 1 for Yes, 0 for No: " is_post_genesis
NAMADA_PORT=26
read -p "Enter your NAMADA_PORT (for example 17, 18, 19... default port=$NAMADA_PORT): " input_port
if [ ! -z "$input_port" ]; then
    NAMADA_PORT=$input_port
fi
echo 'export PORT='$PORT

# set vars
echo "export NAMADA_PORT="$NAMADA_PORT"" >> $HOME/.bash_profile
echo "export ALIAS="CHOOSE_A_NAME_FOR_YOUR_VALIDATOR"" >> $HOME/.bash_profile
echo "export WALLET="CHOOSE_A_WALLET_NAME"" >> $HOME/.bash_profile
echo "export PUBLIC_IP=$(wget -qO- eth0.me)" >> $HOME/.bash_profile
echo "export TM_HASH="v0.1.4-abciplus"" >> $HOME/.bash_profile
echo "export CHAIN_ID="public-testnet-14.5d79b6958580"" >> $HOME/.bash_profile
echo "export BASE_DIR="$HOME/.local/share/namada"" >> $HOME/.bash_profile
source $HOME/.bash_profile

printLine
echo -e "Alias:        \\e[1m\\e[32m$ALIAS\\e[0m"
echo -e "Wallet:         \\e[1m\\e[32m$WALLET\\e[0m"
echo -e "Chain id:       \\e[1m\\e[32m$CHAIN_ID\\e[0m"
echo -e "Node custom port:  \\e[1m\\e[32m$NAMADA_PORT\\e[0m"
echo -e "Node base directory:  \\e[1m\\e[32m$BASE_DIR\\e[0m"
printLine
sleep 1

printGreen "1. Installing go..." && sleep 1
# install go, if needed
cd $HOME
! [ -x "$(command -v go)" ] && {
VER="1.20.3"
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
sudo apt-get install -y git-core libssl-dev pkg-config libclang-12-dev protobuf-compiler
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

printGreen "4. Installing binary..." && sleep 1
# install binaries
NAMADA_TAG=v0.23.1
git clone https://github.com/anoma/namada
cd namada
git checkout $NAMADA_TAG
make build-release
sudo mv target/release/namada* /usr/local/bin/

printGreen "5. Install CometBFT" && sleep 1
# Install CometBFT
cd $HOME
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.2
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin/
cometbft version
sleep 1
echo done

printGreen "6. Joining the network..." && sleep 1
# joining the network
if [ "$is_post_genesis" -eq 1 ]; then
    # Joining network as Pre-Genesis Validator
    cd $HOME
    namada client utils join-network --chain-id $CHAIN_ID --genesis-validator $ALIAS
else
    # Joining network as Full Nodes or Post-Genesis Validator
    namada client utils join-network --chain-id $CHAIN_ID
fi
sleep 1
echo done

printGreen "7. Seting custom ports in config.toml:..." && sleep 1
# Set custom ports
sed -i.bak -e "s%:26658%:${NAMADA_PORT}658%g;
s%:26657%:${NAMADA_PORT}657%g;
s%:26656%:${NAMADA_PORT}656%g;
s%:26545%:${NAMADA_PORT}545%g;
s%^external_address = ""%external_address = "$(wget -qO- eth0.me):${NAMADA_PORT}656"%;
s%:26660%:${NAMADA_PORT}660%g" $HOME/.local/share/namada/public-testnet-14.5d79b6958580/config.toml
sleep 1
echo done

printGreen "8. Creating service file and starting node..." && sleep 1
# create service file
sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=namada
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$BASE_DIR
Environment=CMT_LOG_LEVEL=p2p:none,pex:error
Environment=NAMADA_CMT_STDOUT=true
Environment=NAMADA_LOG=info
ExecStart=$(which namada) node ledger run
StandardOutput=syslog
StandardError=syslog
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF

# enable and start service
sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad && sudo journalctl -u namadad -f`)
}
