import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from '@styles/Services.module.scss'
import { Input, Space, Collapse, Divider } from 'antd'
import Head from 'next/head'

import projects from 'data/projects'
import { Context } from '@context/context'
import { fetchSnap, fetchStatus } from '@utils/fetchProject.js'
import CodeSnippet from '../UI/CodeSnippet'
import AnimatedSection from '../AnimatedSection'
import useNetInfo from 'hooks/useNetInfo'
import useFetchSnapInfo from '@hooks/useFetchSnapInfo'

const Installation = props => {
	const name = props.name
	const type = props.type
	const { livePeers } = useNetInfo(name, type)
	const project = projects[type][name]
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const {
		chainID,
		bin,
		path,
		peerID,
		seedID,
		seedPort,
		peerPort,
		updHeight,
		newInstallBin,
		variable,
		denom,
		goVersion,
		gas,
		unsafeReset,
		minGasPrice,
		newExecStart,
		newInit
	} = project

	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const [isActive, setIsActive] = useState(styles.pending)
	const [installBin, setInstallBin] = useState(project.installBin)
	const [port, setPort] = useState(project.port)
	const [inputStatus, setInputStatus] = useState('')
	const [moniker, setMoniker] = useState('test')
	const [wallet, setWallet] = useState('wallet')
	const [amountCreate, setAmountCreate] = useState(1000000)
	const [details, setDetails] = useState('I love blockchain ❤️')
	const [identity, setIdentity] = useState('')
	const [commissionRate, setCommissionRate] = useState(0.1)
	const [commissionMaxRate, setCommissionMaxRate] = useState(0.2)
	const [commissionMaxChange, setCommissionMaxChange] = useState(0.01)

	const execStart = newExecStart == undefined ? `$(which ${bin}) start --home $HOME/${path}` : newExecStart
	let init = ''

	if (newInit !== 'false') {
		init = newInit == undefined ? `${bin} init "${moniker}" --chain-id ${chainID}` : newInit
	}

	let PEERS = '""',
		SEEDS = '""'
	if (peerID) {
		PEERS = `"${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"`
	}
	if (seedID) {
		SEEDS = `"${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}"`
	}

	const { pruning, indexer } = useFetchSnapInfo(name, type)

	const status = () => {
		fetchStatus(name, type)
			.then(status => {
				setBlockHeight(status.sync_info.latest_block_height)
				setIsActive(styles.active)
				if (updHeight) {
					status.sync_info.latest_block_height >= updHeight ? setInstallBin(newInstallBin) : ''
				}
			})
			.catch(err => {
				console.log(err)
				setIsActive(styles.inactive)
			})
	}

	const fetchData = () => {
		status()
	}

	useEffect(() => {
		fetchData()
		const intervalId = setInterval(fetchData, 10000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	const handlePort = useCallback(e => {
		let onlyNumbers = /^\d+$/
		if (onlyNumbers.test(e.target.value) || e.target.value === '') {
			setPort(e.target.value)
			setInputStatus('')
		} else {
			setInputStatus('error')
		}
	}, [])

	return (
		<AnimatedSection>
			<Head>
				<title>{`Installation - ${projectName} | Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<>
					<h2 id='installation'>Manual Installation</h2>
					<p className='flex flex-wrap items-center gap-2 pb-2'>
						<a href={project.offValDoc} target='_blank' rel='nofollow'>
							Official Documentation
						</a>
						<span className='divider-vertical' />
						<span> Recommended Hardware: {project.hardware}</span>
					</p>
					<p>
						Update packages and Install dependencies{' '}
						<kbd className={`${styles.kbd} dark:bg-slate-600`}>select 1</kbd>
					</p>
					<CodeSnippet
						theme={theme}
						code={`sudo apt update && sudo apt upgrade -y
sudo apt-get install -y make git-core libssl-dev pkg-config libclang-12-dev build-essential protobuf-compiler
`}
					/>
					<p className='flex items-center'>
						Install{' '}
						<span
							className='inline-block h-6 w-6 lg:h-8 lg:w-8 align-top m-1'
							aria-hidden='true'
							style={{ background: "center / contain url('/icons/go-blue.svg')  no-repeat" }}
						></span>
						:
					</p>
					<CodeSnippet
						theme={theme}
						code={`cd $HOME
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
`}
					/>
					<p>Install Rust:</p>
					<CodeSnippet
						theme={theme}
						code={`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env
`}
					/>
					<p>
						Replace your Validator and Wallet name, save and import variables into system. Change default
						port if needed.
					</p>
					<CodeSnippet
						theme={theme}
						code={`NAMADA_PORT=26
echo "export NAMADA_PORT="$NAMADA_PORT"" >> $HOME/.bash_profile
echo "export ALIAS="CHOOSE_A_NAME_FOR_YOUR_VALIDATOR"" >> $HOME/.bash_profile
echo "export WALLET="CHOOSE_A_WALLET_NAME"" >> $HOME/.bash_profile
echo "export PUBLIC_IP=$(wget -qO- eth0.me)" >> $HOME/.bash_profile
echo "export TM_HASH="v0.1.4-abciplus"" >> $HOME/.bash_profile
echo "export CHAIN_ID="public-testnet-15.0dacadb8d663"" >> $HOME/.bash_profile
echo "export BASE_DIR="$HOME/.local/share/namada"" >> $HOME/.bash_profile
source $HOME/.bash_profile
`}
					/>
					<p>Protocol Buffers:</p>
					<CodeSnippet
						theme={theme}
						code={`cd $HOME
curl -L -o protobuf.zip https://github.com/protocolbuffers/protobuf/releases/download/v24.4/protoc-24.4-linux-x86_64.zip
mkdir protobuf_temp && unzip protobuf.zip -d protobuf_temp/
sudo cp protobuf_temp/bin/protoc /usr/local/bin/
sudo cp -r protobuf_temp/include/* /usr/local/include/
rm -rf protobuf_temp protobuf.zip
`}
					/>
					<p>Install CometBFT:</p>
					<CodeSnippet
						theme={theme}
						code={`cd $HOME
rm -rf cometbft
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.2
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin/
cometbft version
`}
					/>
					<p>Download and build Namada binaries:</p>
					<CodeSnippet
						theme={theme}
						code={`cd $HOME
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
`}
					/>
					<p>Check Namada version:</p>
					<CodeSnippet theme={theme} code={`namada --version`} />
				</>

				<div className='flex flex-col gap-2 mb-2'>
					{' '}
					<Collapse
						items={[
							{
								key: '1',
								label: '🔗 Join-network as Pre-Genesis Validator',
								children: (
									<p>
										<span>
											📁 Move your pre-genesis folder to <i>$BASE_DIR</i> and join the network:
										</span>
										<CodeSnippet
											theme={theme}
											code={`cd $HOME
cp -r ~/.namada/pre-genesis $BASE_DIR/
namada client utils join-network --chain-id $CHAIN_ID --genesis-validator $ALIAS`}
										/>
									</p>
								)
							}
						]}
					/>
					<Collapse
						items={[
							{
								key: '1',
								label: '🔗 Join-network as Full Nodes or Post-Genesis Validator',
								children: (
									<p>
										<CodeSnippet
											theme={theme}
											code={`namada client utils join-network --chain-id $CHAIN_ID`}
										/>
									</p>
								)
							}
						]}
					/>
				</div>
				<p>Create Service file:</p>
				<CodeSnippet
					theme={theme}
					code={`sudo tee /etc/systemd/system/namadad.service > /dev/null <<EOF
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
EOF`}
				/>
					<p>Set custom ports in config.toml:</p>
					<CodeSnippet
						theme={theme}
						code={`sed -i.bak -e "s%:26658%:\${NAMADA_PORT}658%g;
s%:26657%:\${NAMADA_PORT}657%g;
s%:26656%:\${NAMADA_PORT}656%g;
s%:26545%:\${NAMADA_PORT}545%g;
s%:8545%:\${NAMADA_PORT}545%g;
s%:26660%:\${NAMADA_PORT}660%g" $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/config.toml`}				
				/>
				<p>Enable and start service:</p>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl daemon-reload
sudo systemctl enable namadad
sudo systemctl restart namadad && sudo journalctl -u namadad -f`}
				/>
				<Collapse
					items={[
						{
							key: '1',
							label: '🔗 Create Post-Genesis Validator (skip this if you are a pre-genesis validator)',
							children: (
								<div className='flex flex-col'>
									<span>Create wallet:</span>
									<CodeSnippet theme={theme} code={`namada wallet address gen --alias $WALLET`} />
									<span>Or restore wallet:</span>
									<CodeSnippet theme={theme} code={`namada wallet key derive --alias $WALLET --hd-path default`} />
									<span>Check wallet list:</span>
									<CodeSnippet theme={theme} code={`namada wallet key list`} />
									<span>
										Fund your wallet from{' '}
										<a href='https://faucet.heliax.click/' target='_blank' rel='noopener noreferrer'>
											faucet
										</a>
									</span>
									<span>Create validator:</span>
									<span className='text_secondary'>
										(!) before creating a validator, you need to check the balance and make sure that the
										node is synched
									</span>
									<span>
										Check Sync status, once your node is fully synced, the output from above will say
										<kbd className={`${styles.kbd} dark:bg-slate-600`}>false</kbd>
									</span>
									<CodeSnippet
										theme={theme}
										code={`curl http://127.0.0.1:26657/status | jq .result.sync_info.catching_up`}
									/>
									<span>Check your balance:</span>
									<CodeSnippet theme={theme} code={`namada client balance --owner $WALLET`} />
									<span>Init validator:</span>
									<CodeSnippet
										theme={theme}
										code={`namada client init-validator \\
 --alias $ALIAS \\
 --account-keys $WALLET \\
 --signing-keys $WALLET \\
 --commission-rate 0.1 \\
 --max-commission-rate-change 0.1 \\
 --email $EMAIL`}
									/>
									<span>Stake your funds:</span>
									<CodeSnippet
										theme={theme}
										code={`namada client bond \\
 --source $WALLET \
 --validator $ALIAS \
 --amount 1000`}
									/>
									<span>Waiting more than 2 epoch and check your status:</span>
									<CodeSnippet theme={theme} code={`namada client bonds --owner $ALIAS`} />
								</div>
							)
						}
					]}
				/>
				<h2 id='auto-installation'>Automatic Installation</h2>
				<CodeSnippet theme={theme} code={`source <(curl -s https://itrocket.net/api/namada/autoinstall/)`} />
				<h2 id='security'>Security</h2>
				<p>To protect you keys please don`t share your privkey, mnemonic and follow a basic security rules</p>
				<h3 id='ssh' className='font-semibold'>
					Set up ssh keys for authentication
				</h3>
				<p>
					You can use this{' '}
					<a
						href='https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04'
						target='_blank'
						rel='noopener noreferrer'
					>
						guide
					</a>{' '}
					to configure ssh authentication and disable password authentication on your server
				</p>
				<h3 id='firewall' className='font-semibold'>
					Firewall security
				</h3>
				<p>Set the default to allow outgoing connections, deny all incoming, allow ssh and node p2p port</p>
				<CodeSnippet
					theme={theme}
					code={`sudo ufw default allow outgoing 
sudo ufw default deny incoming 
sudo ufw allow ssh/tcp 
sudo ufw allow $\{${variable}_PORT}656/tcp
sudo ufw enable`}
				/>
				<h2 id='delete'>Delete node</h2>
				<CodeSnippet
					code={`sudo systemctl stop namadad
sudo systemctl disable namadad
sudo rm -rf /etc/systemd/system/namadad.service
sudo systemctl daemon-reload
sudo rm $(which namada)
sudo rm -rf $HOME/.local/share/namada/public-testnet-15.0dacadb8d663`}
				/>
			</div>
		</AnimatedSection>
	)
}

export default Installation
