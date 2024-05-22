import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import Head from 'next/head'
import { useContext } from 'react'
import AnimatedSection from '../../AnimatedSection'
import CodeSnippet from '../../UI/CodeSnippet'

const LightNode = () => {
	const { theme } = useContext(Context)

	return (
		<AnimatedSection>
			<Head>
				<title>Light Node Setup for Testnet — mocha-4</title>
				<meta name='description' content='Setup instructions for Celestia Light Node on the Testnet.' />
			</Head>

			<div
				className={styles.mainColumn}
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#19191A', gap: '4px' }}
			>
				<h1>Light Node Setup for Testnet — mocha-4</h1>
				<p className='pb-2'>
					<a href='https://docs.celestia.org/nodes/light-node' target='_blank' rel='noopener noreferrer'>
						Official documentation{' '}
					</a>
				</p>
				<h4 className='hardware'>Hardware Requirements:</h4>
				<ul className='!m-1'>
					<li>Memory: 500 MB RAM (minimum)</li>
					<li>CPU: Single Core</li>
					<li>Disk: 50 GB SSD Storage</li>
					<li>Bandwidth: 56 Kbps for Download/56 Kbps for Upload</li>
				</ul>

				<h2 id='installation'>Setting up a light node</h2>
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
VER="1.21.3"
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

				<h4>Download and build binaries:</h4>
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

				<h4>Config and init app:</h4>
				<CodeSnippet theme={theme} code={`celestia light init --p2p.network mocha`} />

				<h4>Create wallet:</h4>
				<CodeSnippet
					theme={theme}
					code={`KEY_NAME="my_celes_key"
cd ~/celestia-node
./cel-key add $KEY_NAME --keyring-backend test --node.type light --p2p.network mocha`}
				/>

				<h4>(Optional) Restore an existing cel_key:</h4>
				<CodeSnippet
					theme={theme}
					code={`KEY_NAME="my_celes_key"
cd ~/celestia-node
./cel-key add $KEY_NAME --keyring-backend test --node.type light --p2p.network mocha --recover`}
				/>

				<h4>You can find the address by running the following command in the celestia-node directory:</h4>
				<CodeSnippet
					theme={theme}
					code={`cd $HOME/celestia-node
./cel-key list --node.type light --keyring-backend test --p2p.network mocha`}
				/>
				<h4>Create Service file Replace FULL node ip, RPC and gRPC ports:</h4>
				<CodeSnippet
					theme={theme}
					code={`CORE_IP="<PUT_FULL_NODE_RPC_IP>"
CORE_RPC_PORT="<PUT_FULL_NODE_RPC_PORT>"
CORE_GRPC_PORT="<PUT_FULL_NODE_GRPC_PORT>"
KEY_NAME="my_celes_key"`}
				/>

				<h4>Create Service file and replace FULL node ip, RPC and gRPC ports:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo tee /etc/systemd/system/celestia-light.service > /dev/null <<EOF
[Unit]
Description=celestia light
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) light start \\
--core.ip $CORE_IP \\
--core.rpc.port $CORE_RPC_PORT \\
--core.grpc.port $CORE_GRPC_PORT \\
--keyring.accname $KEY_NAME \\
--gateway --gateway.addr 0.0.0.0 \\
--gateway.port 26659 \\
--rpc.addr 0.0.0.0 \\
--rpc.port 26658 \\
--p2p.network mocha \\
--metrics.tls=true \\
--metrics --metrics.endpoint otel.celestia-mocha.com
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
sudo systemctl enable celestia-light
sudo systemctl restart celestia-light && sudo journalctl -u celestia-light -f`}
				/>

				<h2 id='cheat-sheet'>Cheat sheet</h2>
				<h4>Check Light Node wallet balance:</h4>
				<CodeSnippet theme={theme} code={`celestia state balance --node.store ~/.celestia-light-mocha-4/`} />

				<h4>Check Light node status:</h4>
				<CodeSnippet
					theme={theme}
					code={`celestia header sync-state --node.store ~/.celestia-light-mocha-4/`}
				/>

				<h4>Submit a blob to Celestia:</h4>
				<CodeSnippet
					theme={theme}
					code={`AUTH_TOKEN=$(celestia light auth admin --p2p.network mocha)
celestia blob submit 0x42690c204d39600fddd3 'gm' --token $AUTH_TOKEN`}
				/>

				<h4>(Optional) Add permissions for transferring keys to another server:</h4>
				<CodeSnippet theme={theme} code={`chmod -R 700 .celestia-light-mocha-4`} />

				<h2 id='upgrade'>Upgrade</h2>
				<h4>Stop light node:</h4>
				<CodeSnippet theme={theme} code={`sudo systemctl stop celestia-light`} />

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
				<CodeSnippet theme={theme} code={`celestia light config-update --p2p.network mocha`} />

				<h4>Start light node:</h4>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl restart celestia-light && sudo journalctl -u celestia-light -f`}
				/>

				<h2 id='delete'>Delete light node</h2>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop celestia-light
sudo systemctl disable celestia-light
sudo rm /etc/systemd/system/celestia-light*
rm -rf $HOME/celestia-node $HOME/.celestia-app $HOME/.celestia-light-mocha`}
				/>
			</div>
		</AnimatedSection>
	)
}

export default LightNode
