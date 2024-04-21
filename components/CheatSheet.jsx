import { Input, Radio, Space } from 'antd'
import Head from 'next/head'
import { useContext, useRef, useState } from 'react'

import CodeBlock from '@components/UI/CodeBlock'
import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import AnimatedSection from './AnimatedSection'
import CodeSnippet from './UI/CodeSnippet'

const CheatSheet = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { chainID, bin, path, peerID, seedID, seedPort, peerPort, denom, gas, node } = project

	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const [livePeers, setLivePeers] = useState('')
	const [moniker, setMoniker] = useState('$MONIKER')
	const [amount, setAmount] = useState(1000000)
	const [amountCreate, setAmountCreate] = useState(1000000)
	const [toValoperAddr, setToValoperAddr] = useState('<TO_VALOPER_ADDRESS>')
	const [toWalletAddr, setToWalletAddr] = useState('<TO_WALLET_ADDRESS>')
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

	const onChange = e => {
		setProposalOption(e.target.value)
	}

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
					<h2 id='service-operations'>Service operations ⚙️</h2>
					<div className='flex flex-wrap gap-x-6 mb-3'>
						<div className='flex flex-col gap-y-2'>
							<CodeBlock desc='Check logs' code={`sudo journalctl -u ${bin} -f`} />
							<CodeBlock desc='Start service' code={`sudo systemctl start ${bin}`} />
							<CodeBlock desc='Stop service' code={`sudo systemctl stop ${bin}`} />
							<CodeBlock desc='Restart service' code={`sudo systemctl restart ${bin}`} />
						</div>

						<div className='flex flex-col gap-y-2'>
							<CodeBlock desc='Check service status' code={`sudo systemctl status ${bin}`} />
							<CodeBlock desc='Reload services' code={`sudo systemctl daemon-reload`} />
							<CodeBlock desc='Enable Service' code={`sudo systemctl enable ${bin}`} />
							<CodeBlock desc='Disable Service' code={`sudo systemctl disable ${bin}`} />
						</div>

						<div className='flex flex-col gap-y-2'>
							<CodeBlock desc='Node info' code={`${bin} status ${node ? node + ' ' : ''}2>&1 | jq`} />
						</div>
					</div>
					<p>Your node peer</p>
					<CodeSnippet
						theme={theme}
						code={`echo $(${bin} tendermint show-node-id)'@'$(wget -qO- eth0.me)':'$(cat $HOME/${path}/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')`}
					/>
					<h2 id='key-management'>Key management</h2>

					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='Add New Wallet' code={`${bin} keys add $WALLET`} />
						<CodeBlock desc='Restore executing wallet' code={`${bin} keys add $WALLET --recover`} />
						<CodeBlock desc='List All Wallets' code={`${bin} keys list`} />
						<CodeBlock desc='Delete wallet' code={`${bin} keys delete $WALLET`} />
						<CodeBlock
							desc='Check Balance'
							code={`${bin} q bank balances $WALLET_ADDRESS ${node ? node : ''}`}
						/>
						<CodeBlock desc='Export Key (save to wallet.backup)' code={`${bin} keys export $WALLET`} />
						<CodeBlock desc='View EVM Prived Key' code={`${bin} keys unsafe-export-eth-key $WALLET`} />
						<CodeBlock
							desc='Import Key (restore from wallet.backup)'
							code={`${bin} keys import $WALLET wallet.backup`}
						/>
					</div>

					<h2 id='tokens'>Tokens</h2>
					<Space size='middle' style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}>
						<Space direction='vertical'>
							<span>To valoper address</span>
							<Input
								style={{ minWidth: '280px' }}
								placeholder={toValoperAddr}
								onChange={e => setToValoperAddr(e.target.value)}
							/>
						</Space>
						<Space direction='vertical'>
							<span>To wallet address</span>
							<Input
								style={{ minWidth: '280px' }}
								placeholder={toWalletAddr}
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
						<CodeBlock
							desc='Withdraw all rewards'
							code={`${bin} tx distribution withdraw-all-rewards --from $WALLET --chain-id ${chainID} ${gas} ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Withdraw rewards and commission from your validator'
							code={`${bin} tx distribution withdraw-rewards $VALOPER_ADDRESS --from $WALLET --commission --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}`}
						/>
						<CodeBlock desc='Check your balance' code={`${bin} query bank balances $WALLET_ADDRESS`} />
						<CodeBlock
							desc='Delegate to Yourself'
							code={`${bin} tx staking delegate $(${bin} keys show $WALLET --bech val -a) ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Delegate'
							code={`${bin} tx staking delegate ${toValoperAddr} ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}	`}
						/>
						<CodeBlock
							desc='Redelegate Stake to Another Validator'
							code={`${bin} tx staking redelegate $VALOPER_ADDRESS ${toValoperAddr} ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Unbond'
							code={`${bin} tx staking unbond $(${bin} keys show $WALLET --bech val -a) ${amount}${denom} --from $WALLET --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Transfer Funds'
							code={`${bin} tx bank send $WALLET_ADDRESS ${toWalletAddr} ${amount}${denom} ${gas} -y ${
								node ? node : ''
							}`}
						/>
					</div>
					<h2 id='validator-operations'> Validator operations</h2>
					<Space size='middle' style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}>
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
						<CodeBlock
							desc='Create New Validator'
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
--details "${details}" \\
--chain-id ${chainID} \\
${gas} \\
-y ${node ? '\\' : ''}
${node ? node : ''}`}
						/>
						<CodeBlock
							desc='Edit Existing Validator'
							code={`${bin} tx staking edit-validator \\
--commission-rate ${commissionRate} \\
--new-moniker "${moniker}" \\
--identity "${identity}" \\
--details "${details}" \\
--from $WALLET \\
--chain-id ${chainID} \\
${gas} \\
-y ${node ? '\\' : ''}
${node ? node : ''}`}
						/>
						<CodeBlock desc='Validator info' code={`${bin} status ${node ? node + ' ' : ''}2>&1 | jq`} />
						<CodeBlock
							desc='Validator Details'
							code={`${bin} q staking validator $(${bin} keys show $WALLET --bech val -a) ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Jailing info'
							code={`${bin} q slashing signing-info $(${bin} tendermint show-validator) ${
								node ? node : ''
							}`}
						/>
						<CodeBlock desc='Slashing parameters' code={`${bin} q slashing params ${node ? node : ''}`} />
						<CodeBlock
							desc='Unjail validator'
							code={`${bin} tx slashing unjail --from $WALLET --chain-id ${chainID} ${gas} -y ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Active Validators List'
							code={`${bin} q staking validators -oj --limit=2000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \t " + .description.moniker' | sort -gr | nl ${
								node ? node : ''
							}`}
						/>
						<CodeBlock
							desc='Check Validator key'
							code={`[[ $(${bin} q staking validator $VALOPER_ADDRESS -oj | jq -r .consensus_pubkey.key) = $(${bin} status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "Your key status is ok" || echo -e "Your key status is error"`}
						/>
						<CodeBlock
							desc='Signing info'
							code={`${bin} q slashing signing-info $(${bin} tendermint show-validator) ${
								node ? node : ''
							}`}
						/>
					</div>
					<h2 id='governance'> Governance</h2>
					<Space size='middle' style={{ margin: '5px 0 20px', display: 'flex', flexWrap: 'wrap' }}>
						<Space direction='vertical'>
							<span>Title</span>
							<Input style={{ minWidth: '280px' }} onChange={e => setTitle(e.target.value)} />
						</Space>
						<Space direction='vertical'>
							<span>Description</span>
							<Input style={{ minWidth: '280px' }} onChange={e => setDesc(e.target.value)} />
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
					<CodeBlock
						desc='Create New Text Proposal'
						code={`${bin}  tx gov submit-proposal \\
--title "${title}" \\
--description "${desc}" \\
--deposit ${deposit}${denom} \\
--type Text \\
--from $WALLET \\
${gas} \\
-y ${node ? '\\' : ''}
${node ? node : ''}`}
					/>
					<CodeBlock desc='Proposals List' code={`${bin} query gov proposals ${node ? node : ''}`} />

					<Space
						size='middle'
						className='flex flex-wrap content-center'
						style={{
							margin: '7px 0 20px'
						}}
					>
						<Space direction='vertical'>
							<span>Proposal ID</span>
							<Input
								className='min-w-[120px]'
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
					<CodeBlock
						desc='View proposal'
						code={`${bin} query gov proposal ${proposalID} ${node ? node : ''}`}
					/>
					<CodeBlock
						desc='Vote'
						code={`${bin} tx gov vote ${proposalID} ${proposalOption} --from $WALLET --chain-id ${chainID}  ${gas} -y ${
							node ? node : ''
						}`}
					/>
				</>
			</div>
		</AnimatedSection>
	)
}

export default CheatSheet
