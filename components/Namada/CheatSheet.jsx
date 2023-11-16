import { useContext, useRef, useState } from 'react'
import Head from 'next/head'
import { Input, Radio, Space } from 'antd'

import CodeBlock from '@components/UI/CodeBlock'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import { Context } from '@context/context'
import CodeSnippet from '../UI/CodeSnippet'
import AnimatedSection from '../AnimatedSection'

const CheatSheet = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { chainID, bin, path, peerID, seedID, seedPort, peerPort, denom, gas } = project

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
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='Check logs' code={`sudo journalctl -u namadad -f -f`} />
						<CodeBlock desc='Check your validator bond status' code={`namada client bonds --owner $ALIAS`} />
						<CodeBlock desc='Check all bonded nodes' code={`namada client bonded-stake`} />
						<CodeBlock desc='Check balance' code={`namada client balance --owner $ALIAS --token NAM`} />
					</div>

					<div className='flex flex-col gap-y-2'>
						<h2 id='wallet-operations'>Wallet operations ⚙️</h2>
						<CodeBlock
							desc='Stake funds'
							code={`namada client bond \\
  --validator $ALIAS \\
  --amount 1500 \\
  --gas-limit 10000000`}
						/>
						<CodeBlock
							desc='Check Sync status and node info'
							code={`curl http://127.0.0.1:26657/status | jq`}
						/>
						<CodeBlock
							desc='Check consensus state'
							code={`curl -s localhost:26657/consensus_state | jq .result.round_state.height_vote_set[0].prevotes_bit_array`}
						/>
						<CodeBlock desc='Full consensus state' code={`curl -s localhost:12657/dump_consensus_state`} />
						<CodeBlock
							desc='Your validator votes (prevote)'
							code={`curl -s http://localhost:26657/dump_consensus_state | jq '.result.round_state.votes[0].prevotes' | grep $(curl -s http://localhost:26657/status | jq -r '.result.validator_info.address[:12]')`}
						/>
					</div>

					<h2 id='sync'>Sync and consensus ⚙️</h2>
				</>
			</div>
		</AnimatedSection>
	)
}

export default CheatSheet
