import styles from '@styles/Services.module.scss'
import { Input, Space } from 'antd'
import Head from 'next/head'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { Context } from '@context/context'
import useFetchSnapInfo from '@hooks/useFetchSnapInfo'
import { fetchStatus } from '@utils/fetchProject.js'
import projects from 'data/projects'
import useNetInfo from 'hooks/useNetInfo'
import AnimatedSection from './AnimatedSection'
import CodeSnippet from './UI/CodeSnippet'

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
		newCreateValidator,
		variable,
		denom,
		goVersion,
		gas,
		unsafeReset,
		minGasPrice,
		newExecStart,
		node,
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
	const [website, setWebsite] = useState('')

	const execStart = newExecStart == undefined ? `$(which ${bin}) start --home $HOME/${path}` : newExecStart
	let init = ''

	init =
		newInit && newInit !== 'false'
			? newInit
			: `${bin} config node tcp://localhost:\${${variable}_PORT}657
${bin} config keyring-backend os
${bin} config chain-id ${chainID}
${bin} init "${moniker}" --chain-id ${chainID}`

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
					<CodeSnippet
						theme={theme}
						code={`# install dependencies, if needed
sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y
`}
					/>
					<Space size='middle' style={{ margin: '12px 0', flexWrap: 'wrap' }}>
						<Space direction='vertical'>
							<span>Node Name</span>
							<Input
								className={styles.input}
								placeholder='test'
								style={{ minWidth: '220px' }}
								onChange={e => setMoniker(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Wallet</span>
							<Input
								className={styles.input}
								placeholder='wallet'
								style={{ minWidth: '220px' }}
								onChange={e => setWallet(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Port</span>
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
						code={`# install go, if needed
cd $HOME
VER="${goVersion}"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source $HOME/.bash_profile
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin

# set vars
echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export ${variable}_CHAIN_ID="${chainID}"" >> $HOME/.bash_profile
echo "export ${variable}_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile

# download binary
${installBin}

# config and init app
${init}

# download genesis and addrbook
wget -O $HOME/${path}/config/genesis.json https://${type}-files.itrocket.net/${name}/genesis.json
wget -O $HOME/${path}/config/addrbook.json https://${type}-files.itrocket.net/${name}/addrbook.json

# set seeds and peers
SEEDS=${SEEDS}
PEERS=${PEERS}
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/; s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/${path}/config/config.toml

# set custom ports in app.toml
sed -i.bak -e "s%:1317%:\${${variable}_PORT}317%g;
s%:8080%:\${${variable}_PORT}080%g;
s%:9090%:\${${variable}_PORT}090%g;
s%:9091%:\${${variable}_PORT}091%g;
s%:8545%:\${${variable}_PORT}545%g;
s%:8546%:\${${variable}_PORT}546%g;
s%:6065%:\${${variable}_PORT}065%g" $HOME/${path}/config/app.toml

# set custom ports in config.toml file
sed -i.bak -e "s%:26658%:\${${variable}_PORT}658%g;
s%:26657%:\${${variable}_PORT}657%g;
s%:6060%:\${${variable}_PORT}060%g;
s%:26656%:\${${variable}_PORT}656%g;
s%^external_address = \\"\\"%external_address = \\"$(wget -qO- eth0.me):\${${variable}_PORT}656\\"%;
s%:26660%:\${${variable}_PORT}660%g" $HOME/${path}/config/config.toml

# config pruning
sed -i -e "s/^pruning *=.*/pruning = \\"custom\\"/" $HOME/${path}/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"100\\"/" $HOME/${path}/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \\"50\\"/" $HOME/${path}/config/app.toml

# set minimum gas price, enable prometheus and disable indexing
sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "${minGasPrice}"|g' $HOME/${path}/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/${path}/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/${path}/config/config.toml

# create service file
sudo tee /etc/systemd/system/${bin}.service > /dev/null <<EOF
[Unit]
Description=${projectName} node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/${path}
ExecStart=${execStart}
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF

# reset and download snapshot
${bin} ${unsafeReset} --home $HOME/${path}
if curl -s --head curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | head -n 1 | grep "200" > /dev/null; then
  curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}
    else
  echo no have snap
fi

# enable and start service
sudo systemctl daemon-reload
sudo systemctl enable ${bin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
					/>
				</>
				<h2 id='auto-installation'>Automatic Installation</h2>
				<p>
					<b className={styles.bold}>pruning: </b> {pruning} {' | '}
					<b className={styles.bold}>indexer: </b> {indexer}
				</p>
				<CodeSnippet
					theme={theme}
					code={`source <(curl -s https://itrocket.net/api/${type}/${name}/autoinstall/)`}
				/>
				<h2 id='create-wallet'>Create wallet</h2>
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
${bin} status ${node ? node + ' ' : ''}2>&1 | jq 

# before creating a validator, you need to fund your wallet and check balance
${bin} query bank balances $WALLET_ADDRESS ${node ? node : ''}
`}
				/>
				<h2 id='create-validator'>Create validator</h2>
				<Space size='middle' style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}>
					<Space direction='vertical'>
						<span>Moniker</span>
						<Input
							style={{ minWidth: '200px' }}
							placeholder={'$MONIKER'}
							onChange={e => setMoniker(e.target.value)}
						/>
					</Space>
					<Space direction='vertical'>
						<span>Identity</span>
						<Input
							style={{ minWidth: '200px' }}
							placeholder={'Identity'}
							onChange={e => setIdentity(e.target.value)}
						/>
					</Space>
					<Space direction='vertical'>
						<span>Details</span>
						<Input
							style={{ minWidth: '250px' }}
							defaultValue={details}
							onChange={e => setDetails(e.target.value)}
						/>
					</Space>
					<Space direction='vertical'>
						<span>Amount, {denom}</span>
						<Input
							style={{ minWidth: '100px' }}
							defaultValue={amountCreate}
							onChange={e => setAmountCreate(e.target.value)}
						/>
					</Space>
					<Space style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
						<Space direction='vertical'>
							<span>Commission rate</span>
							<Input
								style={{ minWidth: '40px' }}
								defaultValue={commissionRate}
								onChange={e => setCommissionRate(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Commission max rate</span>
							<Input
								style={{ minWidth: '40px' }}
								defaultValue={commissionMaxRate}
								onChange={e => setCommissionMaxRate(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Commission max change rate</span>
							<Input
								style={{ minWidth: '40px' }}
								defaultValue={commissionMaxChange}
								onChange={e => setCommissionMaxChange(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Website</span>
							<Input
								style={{ minWidth: '40px' }}
								defaultValue={''}
								onChange={e => setWebsite(e.target.value)}
							/>
						</Space>
					</Space>
				</Space>
				<div className='flex flex-col gap-y-2'>
					{newCreateValidator?.toUpperCase() !== 'JSON' ? (
						<CodeSnippet
							theme={theme}
							code={`${bin} tx staking create-validator \\
--amount ${amountCreate}${denom} \\
--from $WALLET \\
--commission-rate ${commissionRate} \\
--commission-max-rate ${commissionMaxRate} \\
--commission-max-change-rate ${commissionMaxChange} \\
--min-self-delegation 1 \\
--pubkey $(${bin} tendermint show-validator) \\
--moniker "${moniker}" \\
--identity "${identity}" \\
--website "${website}" \\
--details "${details}" \\
--chain-id ${chainID} \\
${gas} \\
-y`}
						/>
					) : (
						<CodeSnippet
							theme={theme}
							code={`cd $HOME
# Create validator.json file
echo "{\\"pubkey\\":{\\"@type\\":\\"/cosmos.crypto.ed25519.PubKey\\",\\"key\\":\\"$(${bin} comet show-validator | grep -Po '\\"key\\":\\s*\\"\\K[^"]*')\\"},
    \\"amount\\": \\"${amountCreate}${denom}\\",
    \\"moniker\\": \\"${moniker}\\",
    \\"identity\\": \\"${identity}\\",
    \\"website\\": \\"${website}\\",
    \\"security\\": \\"\\",
    \\"details\\": \\"${details}\\",
    \\"commission-rate\\": \\"${commissionRate}\\",
    \\"commission-max-rate\\": \\"${commissionMaxRate}\\",
    \\"commission-max-change-rate\\": \\"${commissionMaxChange}\\",
    \\"min-self-delegation\\": \\"1\\"
}" > validator.json
# Create a validator using the JSON configuration
${bin} tx staking create-validator validator.json \\
    --from \$WALLET \\
    --chain-id ${chainID} \\
	${gas} \\
	${node ? node : ''}`}
						/>
					)}
				</div>
				<h2 id='monitoring'>Monitoring</h2>
				<p>
					If you want to have set up a monitoring and alert system use{' '}
					<a href='https://teletype.in/@itrocket/bdJAHvC_q8h' target='_blank' rel='noopener noreferrer'>
						our cosmos nodes monitoring guide with tenderduty
					</a>
				</p>
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
					theme={theme}
					code={`sudo systemctl stop ${bin}
sudo systemctl disable ${bin}
sudo rm -rf /etc/systemd/system/${bin}.service
sudo rm $(which ${bin})
sudo rm -rf $HOME/${path}
sed -i "/${variable}_/d" $HOME/.bash_profile`}
				/>
			</div>
		</AnimatedSection>
	)
} //

export default Installation
