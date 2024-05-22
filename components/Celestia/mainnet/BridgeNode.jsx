import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import Head from 'next/head'
import { useContext } from 'react'
import AnimatedSection from '../../AnimatedSection'
import CodeSnippet from '../../UI/CodeSnippet'

const BridgeNodeMainnetSetup = () => {
	const { theme } = useContext(Context)

	return (
		<AnimatedSection>
			<Head>
				<title>Celestia Bridge Node Setup for Celestia Mainnet - celestia</title>
				<meta name='description' content='Setup instructions for Celestia Bridge Node on the Mainnet.' />
			</Head>

			<div
				className={styles.mainColumn}
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b', gap: '4px' }}
			>
				<h1>Celestia Bridge Node Setup for Celestia Mainnet - celestia</h1>

				<p>
					<a href='https://docs.celestia.org/nodes/bridge-node/' target='_blank' rel='noopener noreferrer'>
						Official documentation
					</a>
				</p>

				<h4 className='hardware'>Hardware Requirements:</h4>
				<ul className='!m-1'>
					<li>Memory: 16 GB RAM</li>
					<li>CPU: 6 cores</li>
					<li>Disk: 10 TB SSD Storage</li>
					<li>Bandwidth: 1 Gbps</li>
				</ul>

				<h2 id='installation'>Set up a Celestia bridge node</h2>
				<h4>Update packages and Install dependencies:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make gcc tar clang pkg-config libssl-dev ncdu -y`}
				/>

				<h4 className='flex items-center'>
					Install{' '}
					<span
						className='inline-block h-6 w-6 lg:h-8 lg:w-8 align-top m-1'
						aria-hidden='true'
						style={{ background: "center / contain url('/icons/go-blue.svg')  no-repeat" }}
					></span>
					:
				</h4>
				<CodeSnippet
					theme={theme}
					code={`cd ~
! [ -x "$(command -v go)" ] && {
VER="1.21.1"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source ~/.bash_profile
}
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin
go version`}
				/>

				<h4>Install Celestia-node:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node/
git checkout tags/v0.13.5 
make build 
sudo make install 
make cel-key`}
				/>

				<h4>Install Celestia-app:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME 
rm -rf celestia-app 
git clone https://github.com/celestiaorg/celestia-app.git 
cd celestia-app/ 
APP_VERSION=v1.9.0
git checkout tags/$APP_VERSION -b $APP_VERSION 
make install`}
				/>

				<h4>Config and init app:</h4>
				<CodeSnippet theme={theme} code={`celestia bridge init --core.ip <RPC_NODE_IP>`} />

				<p>
					Once you start the Bridge Node, a wallet key will be generated for you. You will need to fund that
					address with Mainnet tokens to pay for PayForBlob transactions. You can find the address by running
					the following command:
				</p>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type bridge --keyring-backend test`}
				/>

				<h4>Reset node:</h4>
				<CodeSnippet theme={theme} code={`celestia bridge unsafe-reset-store`} />

				<h4>Add your Full node RPC and gRPC ports:</h4>
				<CodeSnippet
					theme={theme}
					code={`RPC_IP="<PUT_FULL_NODE_RPC_IP>"
RPC_PORT="<PUT_FULL_NODE_RPC_PORT>"
GRPC_PORT="<PUT_FULL_NODE_GRPC_PORT>"`}
				/>

				<h4>Create Service file:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo tee /etc/systemd/system/celestia-bridge.service > /dev/null <<EOF
[Unit]
Description=celestia bridge
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) bridge start  --core.ip $RPC_IP --core.grpc.port $GRPC_PORT --core.rpc.port $RPC_PORT --metrics.tls=true --metrics --metrics.endpoint otel.celestia.observer --keyring.accname my_celes_key --gateway --gateway.addr 0.0.0.0 --gateway.port 26659 --rpc.addr 0.0.0.0 --rpc.port 26658
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
				/>

				<h4>Enable and start service:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl daemon-reload
sudo systemctl enable celestia-bridge
sudo systemctl restart celestia-bridge && sudo journalctl -u celestia-bridge -f`}
				/>

				<h4>Get your node's peerId information:</h4>
				<p>❗NOTE: You can only generate an auth token after initializing and starting your celestia-node.</p>
				<CodeSnippet
					theme={theme}
					code={`NODE_TYPE=bridge
AUTH_TOKEN=$(celestia $NODE_TYPE auth admin)`}
				/>

				<p>Then you can get the peerId of your node with the following curl command:</p>
				<CodeSnippet
					theme={theme}
					code={`curl -X POST \\
     -H "Authorization: Bearer $AUTH_TOKEN" \\
     -H 'Content-Type: application/json' \\
     -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' \\
     http://localhost:26658`}
				/>

				<h2 id='cheat-sheet'>Cheat sheet</h2>
				<h4>Check bridge wallet balance:</h4>
				<CodeSnippet theme={theme} code={`celestia state balance --node.store ~/.celestia-bridge/`} />

				<h4>Get wallet address:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type bridge --keyring-backend test`}
				/>

				<h4>Restore an existing cel_key:</h4>
				<CodeSnippet
					theme={theme}
					code={`KEY_NAME="my_celes_key"
cd ~/celestia-node
./cel-key add $KEY_NAME --keyring-backend test --node.type bridge  --recover`}
				/>

				<h4>Check bridge node status:</h4>
				<CodeSnippet
					theme={theme}
					code={`celestia header sync-state --node.store "/home/celbridge/.celestia-bridge/"`}
				/>

				<h4>Get Node ID:</h4>
				<CodeSnippet theme={theme} code={`celestia p2p info --node.store ~/.celestia-bridge/`} />

				<h4>(Optional) Add permissions for transferring keys to another server:</h4>
				<CodeSnippet theme={theme} code={`chmod -R 700 .celestia-bridge`} />

				<h2 id='upgrade'>Upgrade</h2>
				<h4>Stop bridge node:</h4>
				<CodeSnippet theme={theme} code={`sudo systemctl stop celestia-bridge`} />

				<h4>Download binary:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node/
git checkout tags/v0.13.5 
make build 
sudo make install 
make cel-key`}
				/>

				<h4>Update:</h4>
				<CodeSnippet theme={theme} code={`celestia bridge config-update`} />

				<h4>Start bridge node:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl restart celestia-bridge && sudo journalctl -u celestia-bridge -f`}
				/>

				<h2 id='delete'>Delete bridge node</h2>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop celestia-bridge
sudo systemctl disable celestia-bridge
sudo rm /etc/systemd/system/celestia-bridge*
rm -rf $HOME/celestia-node $HOME/.celestia-app $HOME/.celestia-bridge`}
				/>
			</div>
		</AnimatedSection>
	)
}

export default BridgeNodeMainnetSetup
