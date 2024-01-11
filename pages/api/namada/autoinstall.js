import projects from 'data/projects'
import { fetchNetInfo } from '@utils/fetchProject.js'

export default function handler(req, res) {
	res.setHeader('Cache-Control', 'no-store, max-age=0')

	const type = 'testnet'
	const projectName = 'namada'

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
# Asking the user if they are a PostGenesis validator
read -p "Are you a Post-Genesis validator? Enter 1 for Yes, 0 for No: " is_post_genesis
read -p "Enter your PORT (for example 17,18,19... default port=26):" PORT
echo 'export PORT='$PORT

# set vars
echo "export WALLET="$WALLET"" >> $HOME/.bash_profile
echo "export ALIAS="$ALIAS"" >> $HOME/.bash_profile
echo "export PORT="$PORT"" >> $HOME/.bash_profile
echo "export TM_HASH="v0.1.4-abciplus"" >> $HOME/.bash_profile
echo "export CHAIN_ID="public-testnet-15.0dacadb8d663"" >> $HOME/.bash_profile
echo "export BASE_DIR="$HOME/.local/share/namada"" >> $HOME/.bash_profile
source $HOME/.bash_profile

printLine
echo -e "Alias:        \\e[1m\\e[32m$ALIAS\\e[0m"
echo -e "Wallet:         \\e[1m\\e[32m$WALLET\\e[0m"
echo -e "Chain id:       \\e[1m\\e[32m$CHAIN_ID\\e[0m"
echo -e "Node custom port:  \\e[1m\\e[32m$PORT\\e[0m"
echo -e "Base directory:  \\e[1m\\e[32m$BASE_DIR\\e[0m"
printLine
sleep 1

printGreen "1. Installing go..." && sleep 1
# install go, if needed
cd $HOME
! [ -x "$(command -v go)" ] && {
VER="${goVersion}"
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

printGreen "4. Installing Rust & Cargo..." && sleep 1
# install rust and cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

printGreen "5. Installing Protocol Buffers..." && sleep 1
cd $HOME
curl -L -o protobuf.zip https://github.com/protocolbuffers/protobuf/releases/download/v24.4/protoc-24.4-linux-x86_64.zip
mkdir protobuf_temp && unzip protobuf.zip -d protobuf_temp/
sudo cp protobuf_temp/bin/protoc /usr/local/bin/
sudo cp -r protobuf_temp/include/* /usr/local/include/
rm -rf protobuf_temp protobuf.zip
sleep 1
echo done

printGreen "6. Installing CometBFT..." && sleep 1
# Install CometBFT
cd $HOME
rm -rf $HOME/cometbft
git clone https://github.com/cometbft/cometbft.git
cd $HOME/cometbft
git checkout v0.37.2
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin/
cometbft version
sleep 1
echo done

printGreen "7. Installing binaries..." && sleep 1
# download binary
cd $HOME
rm -rf $HOME/namada
git clone https://github.com/anoma/namada
cd $HOME/namada
wget https://github.com/anoma/namada/releases/download/v0.28.2/namada-v0.28.2-Linux-x86_64.tar.gz
tar -xvf namada-v0.28.2-Linux-x86_64.tar.gz
rm namada-v0.28.2-Linux-x86_64.tar.gz
cd namada-v0.28.2-Linux-x86_64
sudo mv namada namadan namadac namadaw /usr/local/bin/
if [ ! -d "$HOME/.local/share/namada" ]; then
    mkdir -p "$HOME/.local/share/namada"
fi
sleep 1
echo done

printGreen "8. Joining network..." && sleep 1
# Executing actions based on the user's response
if [ "$is_post_genesis" -eq 1 ]; then
    # Joining network as Pre-Genesis Validator
    printRed "Please place the pre-genesis folder at this path $HOME/.local/share/namada then press enter"
    read -p ""
    cd $HOME
    rm -rf $HOME/.local/share/namada/\${CHAIN_ID}
    namada client utils join-network --chain-id $CHAIN_ID --genesis-validator $ALIAS
else
    # Joining network as Full Nodes or Post-Genesis Validator
    cd $HOME
    rm -rf $HOME/.local/share/namada/\${CHAIN_ID}
    namada client utils join-network --chain-id $CHAIN_ID
fi
sleep 1
echo done

printGreen "9. Configuring custom ports..." && sleep 1
# Set custom ports in config.toml
sed -i.bak -e "s%:26658%:\${PORT}658%g; \
s%:26657%:\${PORT}657%g; \
s%:26656%:\${PORT}656%g; \
s%:26545%:\${PORT}545%g; \
s%:8545%:\${PORT}545%g; \
s%:26660%:\${PORT}660%g" $HOME/.local/share/namada/\${CHAIN_ID}/config.toml
sleep 1
echo done


printGreen "10. Creating service file and starting node..." && sleep 1
# create service file
sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
[Unit]
Description=namada
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$BASE_DIR
Environment=TM_LOG_LEVEL=p2p:none,pex:error
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
