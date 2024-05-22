import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import Head from 'next/head'
import { useContext } from 'react'
import AnimatedSection from '../../AnimatedSection'
import CodeSnippet from '../../UI/CodeSnippet'

const BridgeNode = () => {
	const { theme } = useContext(Context)

	return (
		<AnimatedSection>
			<Head>
				<title>Bridge Node Setup for Mocha Testnet — mocha-4</title>
				<meta name='description' content='Celestia Bridge Node Setup instructions for Mocha  Testnet.' />
			</Head>

			<div
				className={styles.mainColumn}
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#19191A', gap: '4px' }}
			>
				<h1>Bridge Node Setup for Mocha Testnet (mocha-4)</h1>

				<p className='flex flex-wrap items-center gap-2 pb-2'>
					<a href='https://docs.celestia.org/nodes/bridge-node/' target='_blank' rel='noopener noreferrer'>
						Official documentation
					</a>
				</p>

				<h4 className='hardware'>Hardware Requirements:</h4>
				<ul className='!m-1'>
					<li>Memory: 8 GB RAM</li>
					<li>CPU: 6 cores</li>
					<li>Disk: 500 GB SSD Storage</li>
					<li>Bandwidth: 1 Gbps for Download/100 Mbps for Upload</li>
				</ul>

				<h2 id='installation'>Setting up a bridge node</h2>
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
cd celestia-app
git checkout tags/v1.9.0 -b v1.9.0
make install`}
				/>

				<h4>Config and init app:</h4>
				<CodeSnippet theme={theme} code={`celestia bridge init --core.ip <RPC_NODE_IP> --p2p.network mocha`} />

				<p>
					Once you start the Bridge Node, a wallet key will be generated for you. You will need to fund that
					address with Testnet tokens to pay for PayForBlob transactions. You can find the address by running
					the following command:
				</p>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type bridge --keyring-backend test --p2p.network mocha`}
				/>

				<h4>Reset node:</h4>
				<CodeSnippet theme={theme} code={`celestia bridge unsafe-reset-store --p2p.network mocha`} />

				<h4 className='flex items-center'>
					Add your Full node RPC and{' '}
					<span
						className='inline-block h-6 w-6 lg:h-8 lg:w-8 align-top m-1'
						aria-hidden='true'
						style={{ background: "center / contain url('/icons/grpc-logo.svg')  no-repeat" }}
					></span>{' '}
					ports:
				</h4>
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
ExecStart=$(which celestia) bridge start  --core.ip $RPC_IP --core.grpc.port $GRPC_PORT --core.rpc.port $RPC_PORT --p2p.network mocha --metrics.tls=true --metrics --metrics.endpoint otel.celestia-mocha.com --keyring.accname my_celes_key --gateway --gateway.addr 0.0.0.0 --gateway.port 26659 --rpc.addr 0.0.0.0 --rpc.port 26658
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
AUTH_TOKEN=$(celestia $NODE_TYPE auth admin --p2p.network mocha)`}
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
				<CodeSnippet theme={theme} code={`celestia state balance --node.store ~/.celestia-bridge-mocha-4/`} />

				<h4>Check bridge node status:</h4>
				<CodeSnippet
					theme={theme}
					code={`celestia header sync-state --node.store "/home/celbridge/.celestia-bridge-mocha-4/"`}
				/>

				<h4>Get Node ID:</h4>
				<CodeSnippet theme={theme} code={`celestia p2p info --node.store ~/.celestia-bridge-mocha-4/`} />

				<h4>(Optional) Add permissions for transferring keys to another server:</h4>
				<CodeSnippet theme={theme} code={`chmod -R 700 .celestia-bridge-mocha-4`} />

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
				<CodeSnippet theme={theme} code={`celestia bridge config-update --p2p.network mocha`} />

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
rm -rf $HOME/celestia-node $HOME/.celestia-app $HOME/.celestia-bridge-mocha-4`}
				/>
			</div>
		</AnimatedSection>
	)
}

export default BridgeNode
