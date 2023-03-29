import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Context } from '@context/context'
import { fetchNetInfo, fetchSnap, fetchStatus } from '@utils/fetchProject.js'
import CodeSnippet from './CodeSnippet'
import { Input, Space } from 'antd'
import { FileDoneOutlined, SearchOutlined } from '@ant-design/icons'

const Installation = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const {
		bin,
		path,
		peerID,
		seedID,
		seedPort,
		peerPort,
		updHeight,
		newInstallBin,
		VAR,
		denom,
	} = project

	explorer.current = project.explorer

	let wasm = useRef('false')

	const { theme } = useContext(Context)
	const [isActive, setIsActive] = useState(styles.pending)
	const [id, setId] = useState('')
	const [livePeers, setLivePeers] = useState('')
	const [blockHeight, setBlockHeight] = useState(null)
	const [installBin, setInstallBin] = useState(project.installBin)
	const [pruning, setPruning] = useState('')
	const [indexer, setIndexer] = useState(null)
	const [moniker, setMoniker] = useState('')
	const [wallet, setWallet] = useState('wallet')
	const [port, setPort] = useState(project.port)
	const [inputStatus, setInputStatus] = useState('')

	const status = () => {
		fetchStatus(name, type)
			.then(status => {
				setId(status.node_info.network)
				setBlockHeight(status.sync_info.latest_block_height)
				setIsActive(styles.active)
				if (updHeight) {
					status.sync_info.latest_block_height >= updHeight
						? setInstallBin(newInstallBin)
						: ''
				}
			})
			.catch(err => {
				console.log(err)
				setIsActive(styles.inactive)
			})
	}

	const netInfo = () => {
		fetchNetInfo(name, type)
			.then(info => {
				const peers = info.peers
				const livePeers = []
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
				setLivePeersCounter(livePeers.length)
				setLivePeers(livePeers.join())
			})
			.catch(err => {
				console.log(err)
			})
	}

	const snap = () => {
		fetchSnap(name, type)
			.then(data => {
				setPruning(data.pruning)
				setIndexer(data.indexer)
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		status()
		netInfo()
		snap()

		setInterval(() => {
			status()
			netInfo()
			snap()
		}, 10000)
	}, [])

	const handlePort = e => {
		let onlyNumbers = /^\d+$/
		if (onlyNumbers.test(e.target.value) || e.target.value === '') {
			setPort(e.target.value)
			setInputStatus('')
		} else {
			setInputStatus('error')
		}
	}

	return (
		<>
			<Head>
				<title>{`Installation - ${projectName} | Services`}</title>
				<meta
					name='description'
					content='ITRocket 🚀 | Crypto Multipurpose Project'
				/>
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<>
					<p className='flex items-center gap-2'>
						<FileDoneOutlined />{' '}
						<a href={project.offValDoc} target='_blank' rel='nofollow'>
							Official Documentation
						</a>
						<span className='divider__dot' />
						<SearchOutlined />{' '}
						{!explorer.current ? (
							<a
								href={`https://${type}.itrocket.net/${name}/staking`}
								target='_blank'
								rel='noopener referrer'
							>
								Explorer
							</a>
						) : (
							<a
								href={`${explorer.current}`}
								target='_blank'
								rel='noopener referrer'
							>
								Explorer
							</a>
						)}
						<span className='divider__dot' />
						<span> Recommended Hardware: {project.hardware}</span>
					</p>

					<h2 id='installation'>Manual Installation</h2>
					<p className={styles.text_secondary}>
						<b className={styles.bold}>pruning: </b> {pruning} {' | '}
						<b className={styles.bold}>indexer: </b> {indexer}
					</p>
					<CodeSnippet
						theme={theme}
						code={`# install dependencies, if needed
sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y  

# install go, if needed
wget -O go_install.sh https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/go_install.sh && chmod +x go_install.sh && ./go_install.sh
source ~/.bash_profile
go version`}
					/>
					<Space size='middle' style={{ margin: '12px 0', flexWrap: 'wrap' }}>
						<Space direction='vertical'>
							<span className={styles.text_secondary}>Node Name</span>
							<Input
								className={styles.input}
								placeholder='Your Node Name'
								style={{ minWidth: '250px' }}
								onChange={e => setMoniker(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span className={styles.text_secondary}>Wallet</span>
							<Input
								className={styles.input}
								defaultValue='wallet'
								style={{ minWidth: '200px' }}
								onChange={e => setWallet(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span className={styles.text_secondary}>Port</span>
							<Input
								className={styles.input}
								status={inputStatus}
								defaultValue={port}
								maxLength={2}
								style={{ maxWidth: '45px' }}
								onChange={handlePort}
							/>
						</Space>
					</Space>
					<CodeSnippet
						theme={theme}
						code={`# set vars
echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export ${VAR}_CHAIN_ID="${id}"" >> $HOME/.bash_profile
echo "export ${VAR}_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile

# download binary
${installBin}

# config and init app
${bin} config node tcp://localhost:\${${VAR}_PORT}657
${bin} config keyring-backend test
${bin} config chain-id ${id}
${bin} init ${moniker} --chain-id ${id}

# download genesis and addrbook
wget -O $HOME/${path}/config/genesis.json https://files.itrocket.net/${type}/${name}/genesis.json
wget -O $HOME/${path}/config/addrbook.json https://files.itrocket.net/${type}/${name}/addrbook.json

# set seeds and peers
SEEDS="${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}"
PEERS="${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"
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
sed -i 's/minimum-gas-prices =.*/minimum-gas-prices = "0.0${denom}"/g' $HOME/${path}/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/${path}/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/${path}/config/config.toml

# create service file
sudo tee /etc/systemd/system/${bin}.service > /dev/null <<EOF
[Unit]
Description=${projectName} node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which ${bin}) start --home $HOME/${path}
Restart=on-failure
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF

# reset and download snapshot
${bin} tendermint unsafe-reset-all --home $HOME/${path}
curl https://files.itrocket.net/${type}/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

# enable and start service
sudo systemctl daemon-reload
sudo systemctl enable ${bin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
					/>
				</>
				<h2 id='wallet'>Create wallet</h2>
				<CodeSnippet
					theme={theme}
					code={`# to create a new wallet, use the following command. don’t forget to save the mnemonic
${bin} keys add $WALLET

# to restore exexuting wallet, use the following command
${bin} keys add $WALLET --recover

# save wallet and validator address
WALLET_ADDRESS=$(${bin} keys show $WALLET -a)
VALOPER_ADDRESS=$(${bin} keys show $WALLET --bech val -a)
echo "export WALLET_ADDRESS="$WALLET_ADDRESS >> $HOME/.bash_profile
echo "export VALOPER_ADDRESS="$VALOPER_ADDRESS >> $HOME/.bash_profile
source $HOME/.bash_profile

# check sync status, once your node is fully synced, the output from above will print "false"
${bin} status 2>&1 | jq .SyncInfo

# before creating a validator, you need to fund your wallet and check balance
${bin} query bank balances $WALLET_ADDRESS

`}
				/>
				<h2 id='validator'>Create validator</h2>
				<CodeSnippet
					theme={theme}
					code={`# create validator
${bin} tx staking create-validator \\
  --amount 1000000${denom} \\
  --from $WALLET \\
  --commission-max-change-rate "0.01" \\
  --commission-max-rate "0.2" \
  --commission-rate "0.05" \\
  --min-self-delegation "1" \\
  --pubkey  $(${bin} tendermint show-validator) \\
  --moniker $MONIKER \\
  --chain-id ${id}
  
# you can add "--website" "--security-contact" "--identity" "--details" flags in it needed
--website \<YOUR_SITE_URL> \\
--security-contact \<YOUR_CONTACT> \\
--identity \<KEYBASE_IDENTITY> \\
--details \<YOUR_VALIDATOR_DETAILS>

`}
				/>
				<h2 id='monitoring'>Monitoring</h2>
				<p>
					If you want to have set up a monitoring and alert system use{' '}
					<a
						href='https://teletype.in/@itrocket/bdJAHvC_q8h'
						target='_blank'
						rel='noopener noreferrer'
					>
						our cosmos nodes monitoring guide with tenderduty
					</a>
				</p>
				<h2 id='security'>Security</h2>
				<p>
					To protect you keys please don`t share your privkey, mnemonic and
					follow a basic security rules
				</p>
				<h3 id='ssh'>Set up ssh keys for authentication</h3>
				<p>
					You can use this{' '}
					<a
						href='https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04'
						target='_blank'
						rel='noopener noreferrer'
					>
						guide
					</a>{' '}
					to configure ssh authentication and disable password authentication on
					your server
				</p>
				<h3 id='firewall'>Firewall security</h3>
				<p>
					Set the default to allow outgoing connections, deny all incoming,
					allow ssh and node p2p port
				</p>
				<CodeSnippet
					theme={theme}
					code={`sudo ufw default allow outgoing 
sudo ufw default deny incoming 
sudo ufw allow ssh/tcp 
sudo ufw allow $\{${VAR}_PORT}656/tcp
sudo ufw enable`}
				/>
				<h2 id='delete'>Delete node</h2>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop ${bin}
sudo systemctl disable ${bin}
sudo rm -rf /etc/systemd/system/${bin}*
sudo rm $(which ${bin})
sudo rm -rf $HOME/${path}
sed -i "/${VAR}_/d" $HOME/.bash_profile`}
				/>
			</div>
		</>
	)
}

export default Installation
