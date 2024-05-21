import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import Head from 'next/head'
import { useContext } from 'react'
import AnimatedSection from '../../AnimatedSection'
import CodeSnippet from '../../UI/CodeSnippet'

const FullStorageNodeSetup = () => {
	const { theme } = useContext(Context)

	return (
		<AnimatedSection>
			<Head>
				<title>Celestia Full Storage Node Setup for Mocha Race Testnet — mocha-4</title>
				<meta
					name='description'
					content='Setup instructions for Celestia Full Storage Node on the Mocha Race Testnet.'
				/>
			</Head>

			<div className={styles.mainColumn} style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}>
				<h1>Celestia Full Storage Node Setup for Mocha Race Testnet — mocha-4</h1>
				<p>
					Official documentation:{' '}
					<a
						href='https://docs.celestia.org/nodes/full-storage-node'
						target='_blank'
						rel='noopener noreferrer'
					>
						Full Storage node setup instructions
					</a>
				</p>

				<h4 className='hardware'>Hardware Requirements:</h4>
				<ul className='!m-1'>
					<li>Memory: 4 GB RAM (minimum)</li>
					<li>CPU: 6 cores</li>
					<li>Disk: 10 TB SSD Storage</li>
					<li>Bandwidth: 1 Gbps for Download/1 Gbps for Upload</li>
				</ul>

				<h2 id='installation'>Set up a full storage node</h2>
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

				<h4>Create wallet:</h4>
				<CodeSnippet
					theme={theme}
					code={`./cel-key add my_celes_key --keyring-backend test --node.type full --p2p.network mocha`}
				/>

				<h4>(Optional) Restore an existing cel_key:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd ~/celestia-node
./cel-key add my_celes_key --keyring-backend test --node.type full --recover`}
				/>

				<h4>You can find the address by running the following command in the celestia-node directory:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type full --keyring-backend test --p2p.network mocha`}
				/>

				<h4>Config and init app:</h4>
				<CodeSnippet
					theme={theme}
					code={`celestia full init --keyring.accname my_celes_key --p2p.network mocha-4`}
				/>
				<h4>
					If keys have not been created previously, Once you start the Bridge Node, a wallet key will be
					generated for you. You will need to fund that address with Testnet tokens to pay for PayForBlob
					transactions. You can find the address by running the following command:
				</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type bridge --keyring-backend test --p2p.network mocha`}
				/>
				<h4>Replace Consensus node ip, RPC and gRPC ports</h4>
				<CodeSnippet
					theme={theme}
					code={`CORE_IP="<PUT_RPC_IP>"
CORE_RPC_PORT="<PUT_RPC_PORT>"
CORE_GRPC_PORT="<PUT_GRPC_PORT>"
KEY_NAME="my_celes_key"`}
				/>

				<h4>Create Service file:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo tee /etc/systemd/system/celestia-full.service > /dev/null <<EOF
[Unit]
Description=celestia full
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) full start \\
--core.ip $CORE_IP \\
--core.rpc.port $CORE_RPC_PORT \\
--core.grpc.port $CORE_GRPC_PORT \\
--gateway \\
--gateway.addr "0.0.0.0" \\
--gateway.port "26659" \\
--rpc.addr "0.0.0.0" \\
--rpc.port "26658" \\
--p2p.network mocha \\
--keyring.accname $KEY_NAME \\
--metrics.tls=true --metrics --metrics.endpoint otel.celestia-mocha.com
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
sudo systemctl enable celestia-full
sudo systemctl restart celestia-full && sudo journalctl -u celestia-full -f`}
				/>

				<h4>Get your node's peerId information:</h4>
				<CodeSnippet
					theme={theme}
					code={`NODE_TYPE=full
AUTH_TOKEN=$(celestia $NODE_TYPE auth admin --p2p.network mocha)`}
				/>

				<h4>Then you can get the peerId of your node with the following curl command:</h4>
				<CodeSnippet
					theme={theme}
					code={`curl -X POST \\
     -H "Authorization: Bearer $AUTH_TOKEN" \\
     -H 'Content-Type: application/json' \\
     -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' \\
     http://localhost:26658`}
				/>

				<h2 id='cheat-sheet'>Useful commands</h2>
				<h4>Check balance:</h4>
				<CodeSnippet theme={theme} code={`celestia state balance --node.store ~/.celestia-full-mocha-4/`} />

				<h4>Reset node:</h4>
				<CodeSnippet theme={theme} code={`celestia full unsafe-reset-store --p2p.network mocha`} />

				<h4>(Optional) Add permissions for transferring keys to another server:</h4>
				<CodeSnippet theme={theme} code={`chmod -R 700 .celestia-full-mocha-4`} />

				<h2 id='upgrade'>Upgrade</h2>
				<h4>Stop Full Storage node:</h4>
				<CodeSnippet theme={theme} code={`sudo systemctl stop celestia-full`} />

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
				<CodeSnippet theme={theme} code={`celestia full config-update --p2p.network mocha`} />

				<h4>Start full storage node:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl restart celestia-full && sudo journalctl -u celestia-full -f`}
				/>

				<h2 className='delete'>Delete Full Storage node</h2>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop celestia-full
sudo systemctl disable celestia-full
sudo rm /etc/systemd/system/celestia-full*
rm -rf $HOME/celestia-node $HOME/.celestia-app $HOME/.celestia-full-blockspacerace-0`}
				/>
			</div>
		</AnimatedSection>
	)
}

export default FullStorageNodeSetup
