import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Context } from '@context/context'
import { fetchNetInfo, fetchSnap, fetchStatus } from '@utils/fetchProject.js'
import CodeSnippet from './CodeSnippet'
import { Input, Radio, Space } from 'antd'
import { FileDoneOutlined } from '@ant-design/icons'
import AnimatedSection from './AnimatedSection'

const CheatSheet = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const {
		chainID,
		bin,
		path,
		peerID,
		seedID,
		seedPort,
		peerPort,
		updHeight,
		denom,
		gas,
		unsafeReset,
		minGasPrice,
	} = project

	explorer.current = project.explorer
	let wasm = useRef('false')
	const { theme } = useContext(Context)
	const [isActive, setIsActive] = useState(styles.pending)
	const [livePeers, setLivePeers] = useState('')
	const [pruning, setPruning] = useState('')
	const [indexer, setIndexer] = useState(null)
	const [moniker, setMoniker] = useState('$MONIKER')
	const [wallet, setWallet] = useState('wallet')
	const [amount, setAmount] = useState(1000000)
	const [amountCreate, setAmountCreate] = useState(1000000)
	const [toValoperAddr, setToValoperAddr] = useState('<TO_VALOPER_ADDRESS>')
	const [toWalletAddr, setToWalletAddr] = useState('<TO_WALLET_ADDRESS>')
	const [inputStatus, setInputStatus] = useState('')
	const [details, setDetails] = useState('I love blockchain ❤️')
	const [identity, setIdentity] = useState('')
	const [commissionRate, setCommissionRate] = useState(0.1)
	const [commissionMaxRate, setCommissionMaxRate] = useState(0.2)
	const [commissionMaxChange, setCommissionMaxChange] = useState(0.01)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [deposit, setDeposit] = useState(1000000)
	const [proposalID, setProposalID] = useState(1)
	const [proposalOption, setProposalOption] = useState('yes')

	let PEERS = '""',
		SEEDS = '""'
	if (peerID) {
		PEERS = `"${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"`
	}
	if (seedID) {
		SEEDS = `"${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}"`
	}

	// const status = () => {
	// 	fetchStatus(name, type)
	// 		.then(status => {
	// 			setBlockHeight(status.sync_info.latest_block_height)
	// 			setIsActive(styles.active)
	// 			if (updHeight) {
	// 				status.sync_info.latest_block_height >= updHeight
	// 					? setInstallBin(newInstallBin)
	// 					: ''
	// 			}
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 			setIsActive(styles.inactive)
	// 		})
	// }
	// const netInfo = () => {
	// 	fetchNetInfo(name, type)
	// 		.then(info => {
	// 			const peers = info.peers
	// 			const letters = /[a-zA-Z]/

	// 			peers.map(peer => {
	// 				if (peer.is_outbound === true) {
	// 					let ip = peer.remote_ip
	// 					const id = peer.node_info.id
	// 					const listen_addr = peer.node_info.listen_addr

	// 					if (letters.test(ip)) {
	// 						ip = `[${ip}]`
	// 					}

	// 					let i = listen_addr.length - 1
	// 					let port = ''

	// 					while (listen_addr[i] !== ':') {
	// 						port += listen_addr[i]
	// 						i--
	// 					}
	// 					port = port.split('').reverse().join('')
	// 					livePeers.push(`${chainID}@${ip}:${port}`)
	// 				}
	// 			})
	// 			livePeers.unshift('')
	// 			setLivePeersCounter(livePeers.length)
	// 			setLivePeers(livePeers.join())
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }
	// const snap = () => {
	// 	fetchSnap(name, type)
	// 		.then(data => {
	// 			setPruning(data.pruning)
	// 			setIndexer(data.indexer)
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }

	// useEffect(() => {
	// 	status()
	// 	netInfo()
	// 	snap()

	// 	setInterval(() => {
	// 		status()
	// 		netInfo()
	// 		snap()
	// 	}, 10000)
	// }, [])

	const handlePort = e => {
		let onlyNumbers = /^\d+$/
		if (onlyNumbers.test(e.target.value) || e.target.value === '') {
			setPort(e.target.value)
			setInputStatus('')
		} else {
			setInputStatus('error')
		}
	}

	const onChange = e => {
		setProposalOption(e.target.value)
	}

	const GenerateCode = (desc, code) => {
		return (
			<div className='flex flex-col'>
				<p className='w-fit'>{desc}</p>
				<CodeSnippet theme={theme} code={code} />
			</div>
		)
	}

	return (
		<AnimatedSection>
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
					<h2 id='service-operations'>Service operations ⚙️</h2>
					<div className='flex flex-wrap gap-x-6 mb-3'>
						<div className='flex flex-col gap-y-2'>
							{GenerateCode('Check logs', `sudo journalctl -u ${bin} -f`)}
							{GenerateCode('Start service', `sudo systemctl start ${bin}`)}
							{GenerateCode('Stop service', `sudo systemctl stop ${bin}`)}
							{GenerateCode('Restart service', `sudo systemctl restart ${bin}`)}
						</div>

						<div className='flex flex-col gap-y-2'>
							{GenerateCode(
								'Check service status',
								`sudo systemctl status ${bin}`
							)}
							{GenerateCode('Reload services', `sudo systemctl daemon-reload`)}
							{GenerateCode('Enable Service', `sudo systemctl enable ${bin}`)}
							{GenerateCode('Disable Service', `sudo systemctl disable ${bin}`)}
						</div>

						<div className='flex flex-col gap-y-2'>
							{GenerateCode('Synch info', `${bin} status 2>&1 | jq .SyncInfo`)}
							{GenerateCode('Node info', `${bin} status 2>&1 | jq .NodeInfo`)}
						</div>
					</div>
					<p>Your node peer</p>
					<CodeSnippet
						theme={theme}
						code={`echo $(${bin} tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat $HOME/${path}/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')`}
					/>
					<h2 id='key-management'>Key management 🔐</h2>
					<div className='flex flex-wrap gap-x-12 gap-y-3 mb-3'>
						<div className='flex flex-col gap-y-2'>
							{GenerateCode('Add New Wallet', `${bin} keys add $WALLET`)}
							{GenerateCode(
								'Restore executing wallet',
								`${bin} keys add $WALLET --recover`
							)}
							{GenerateCode('List All Wallets', `${bin} keys list`)}
							{GenerateCode('Delete wallet', `${bin} keys delete $WALLET`)}
						</div>

						<div className='flex flex-col gap-y-2'>
							{GenerateCode(
								'Check Balance',
								`${bin} q bank balances $(${bin} keys show $WALLET -a)`
							)}
							{GenerateCode(
								'Export Key (save to wallet.backup)',
								`${bin} keys export $WALLET`
							)}
							{GenerateCode(
								'Import Key (restore from wallet.backup)',
								`${bin} keys import $WALLET wallet.backup`
							)}
						</div>
					</div>

					<h2 id='tokens'>Tokens 🪙</h2>
					<Space
						size='middle'
						style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}
					>
						<Space direction='vertical'>
							<span>To valoper address</span>
							<Input
								style={{ minWidth: '280px' }}
								defaultValue={toValoperAddr}
								onChange={e => setToValoperAddr(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>To wallet address</span>
							<Input
								style={{ minWidth: '280px' }}
								defaultValue={toWalletAddr}
								onChange={e => setToWalletAddr(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Amount, {denom}</span>
							<Input
								defaultValue={amount}
								style={{ minWidth: '200px' }}
								onChange={e => setAmount(e.target.value)}
							/>
						</Space>
					</Space>
					<div className='flex flex-col gap-y-2'>
						{GenerateCode(
							'Withdraw all rewards',
							`${bin} tx distribution withdraw-all-rewards --from $WALLET --chain-id ${chainID} ${gas}`
						)}
						{GenerateCode(
							'Withdraw rewards and commission from your validator',
							`${bin} tx distribution withdraw-rewards $VALOPER_ADDRESS --from $WALLET --commission --chain-id ${chainID} ${gas} -y`
						)}
						{GenerateCode(
							'Check your balance',
							`${bin} query bank balances $WALLET_ADDRESS`
						)}
						{GenerateCode(
							'Delegate to Yourself',
							`${bin} tx staking delegate $(${bin} keys show $WALLET --bech val -a) ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y`
						)}
						{GenerateCode(
							'Delegate',
							`${bin} tx staking delegate ${toValoperAddr} ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} --gas auto -y`
						)}
						{GenerateCode(
							'Redelegate Stake to Another Validator',
							`${bin} tx staking redelegate $VALOPER_ADDRESS ${toValoperAddr} ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y`
						)}
						{GenerateCode(
							'Unbond',
							`${bin} tx staking unbond $(${bin} keys show $WALLET --bech val -a) ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y`
						)}
						{GenerateCode(
							'Transfer Funds',
							`${bin} tx bank send $WALLET_ADDRESS ${toWalletAddr} ${amount}${denom} ${gas} -y`
						)}
					</div>
					<h2 id='validator-operations'> Validator operations 🧑‍💻</h2>
					<Space
						size='middle'
						style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}
					>
						<Space direction='vertical'>
							<span>Moniker</span>
							<Input
								style={{ minWidth: '280px' }}
								placeholder={'$MONIKER'}
								onChange={e => setMoniker(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Identity</span>
							<Input
								style={{ minWidth: '280px' }}
								placeholder={'identity'}
								onChange={e => setIdentity(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Details</span>
							<Input
								style={{ minWidth: '320px' }}
								defaultValue={details}
								onChange={e => setDetails(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Amount, {denom}</span>
							<Input
								style={{ minWidth: '200px' }}
								defaultValue={amountCreate}
								onChange={e => setAmountCreate(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Commission rate</span>
							<Input
								style={{ minWidth: '100px' }}
								defaultValue={commissionRate}
								onChange={e => setCommissionRate(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Commission max rate</span>
							<Input
								style={{ minWidth: '100px' }}
								defaultValue={commissionMaxRate}
								onChange={e => setCommissionMaxRate(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Commission max change rate</span>
							<Input
								style={{ minWidth: '100px' }}
								defaultValue={commissionMaxChange}
								onChange={e => setCommissionMaxChange(e.target.value)}
							/>
						</Space>
					</Space>

					<div className='flex flex-col gap-y-2'>
						{GenerateCode(
							'Create New Validator',
							`${bin} tx staking create-validator \\
--amount ${amountCreate}${denom} \\
--from $WALLET \\
--commission-rate ${commissionRate} \\
--commission-max-rate ${commissionMaxRate} \\
--commission-max-change-rate ${commissionMaxChange} \\
--min-self-delegation 1 \\
--pubkey $(${bin} tendermint show-validator) \\
--moniker "${moniker}" \\
--identity "${identity}" \\
--details "${details}" \\
--chain-id ${chainID} \\
${gas} \\
-y `
						)}
						{GenerateCode(
							'Edit Existing Validator',
							`${bin} tx staking edit-validator \\
--commission-rate ${commissionRate} \\
--new-moniker "${moniker}" \\
--identity "${identity}" \\
--details "${details}" \\
--from $WALLET \\
--chain-id ${chainID} \\
${gas} \\
-y`
						)}
						{GenerateCode(
							'Validator info',
							`${bin} status 2>&1 | jq .ValidatorInfo`
						)}
						{GenerateCode(
							'Validator Details',
							`${bin} q staking validator $(${bin} keys show $WALLET --bech val -a)`
						)}
						{GenerateCode(
							'Jailing info',
							`${bin} q slashing signing-info $(${bin} tendermint show-validator)`
						)}
						{GenerateCode(
							'Unjail validator',
							`${bin} tx slashing unjail --broadcast-mode block --from $WALLET --chain-id ${chainID} ${gas} -y`
						)}
						{GenerateCode(
							'Active Validators List',
							`${bin} q staking validators -oj --limit=2000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \t " + .description.moniker' | sort -gr | nl`
						)}
					</div>
					<h2 id='governance'> Governance 🌐</h2>
					<Space
						size='middle'
						style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}
					>
						<Space direction='vertical'>
							<span>Title</span>
							<Input
								style={{ minWidth: '280px' }}
								onChange={e => setTitle(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Description</span>
							<Input
								style={{ minWidth: '280px' }}
								onChange={e => setDesc(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Deposit, {denom}</span>
							<Input
								style={{ minWidth: '280px' }}
								defaultValue={deposit}
								onChange={e => setDepositDenom(e.target.value)}
							/>
						</Space>
					</Space>
					{GenerateCode(
						'Create New Text Proposal',
						`${bin}  tx gov submit-proposal \\
--title "${title}" \\
--description "${desc}" \\
--deposit ${deposit}${denom} \\
--type Text \\
--from $WALLET \\
${gas} \\
-y `
					)}
					{GenerateCode('Proposals List', `${bin} query gov proposals`)}

					<Space
						size='middle'
						className='flex flex-wrap content-center'
						style={{
							margin: '5px 0 20px',
						}}
					>
						<Space direction='vertical'>
							<span>Proposal ID</span>
							<Input
								style={{ minWidth: '200px' }}
								defaultValue={proposalID}
								onChange={e => setProposalID(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>Proposal option</span>
							<Radio.Group onChange={onChange} defaultValue='yes'>
								<Radio.Button value='yes'>Yes</Radio.Button>
								<Radio.Button value='no'>No</Radio.Button>
								<Radio.Button value='no_with_veto'>No with veto</Radio.Button>
								<Radio.Button value='abstain'>Abstain</Radio.Button>
							</Radio.Group>
						</Space>
					</Space>
					{GenerateCode(
						'View proposal',
						`${bin} query gov proposal ${proposalID}`
					)}
					{GenerateCode(
						'Vote',
						`${bin} tx gov vote ${proposalID} ${proposalOption} --from $WALLET --chain-id ${chainID}  ${gas} -y`
					)}
				</>
			</div>
		</AnimatedSection>
	)
}

export default CheatSheet
