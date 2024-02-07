import { useContext, useRef, useState } from 'react'
import Head from 'next/head'
import { Input, Radio, Space } from 'antd'

import CodeBlock from '@components/UI/CodeBlock'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import { Context } from '@context/context'
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

	let PEERS = '""',
		SEEDS = '""'
	if (peerID) {
		PEERS = `"${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"`
	}
	if (seedID) {
		SEEDS = `"${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}"`
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
					<div className='flex flex-col'>
						<span>
							Official docs:{' '}
							<a
								href='https://docs.namada.net/users/transparent-accounts'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://docs.namada.net/users/transparent-accounts
							</a>
						</span>
						<span>
							Faucet:{' '}
							<a href='https://faucet.heliax.click/' target='_blank' rel='noopener noreferrer'>
								https://faucet.heliax.click/
							</a>
						</span>
						<br />
					</div>
					<h2 id='wallet-operations'>Wallet operations</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='create a new keypair:' code={`namada wallet gen --alias $WALLET`} />
						<CodeBlock
							desc='restore executed key:'
							code={`namada wallet derive --alias $WALLET --hd-path default`}
						/>
						<CodeBlock desc='view your address:' code={`namada wallet find --alias $WALLET`} />
						<CodeBlock desc='add some tokens using faucet:' code={`https://faucet.heliax.click/`} />
						<CodeBlock desc='check balance:' code={`namada client balance --owner $WALLET`} />
						<CodeBlock desc='check keys:' code={`namada wallet list`} />
						<CodeBlock
							desc='send payment from one address to another:'
							code={`namada client transfer --source $WALLET --target $\{WALLET\}1 --token NAAN --amount 1 --signing-keys $WALLET --memo $MEMO`}
						/>
						<CodeBlock desc='remove keys:' code={`namada wallet remove --alias $WALLET --do-it`} />
					</div>

					<h2 id='Staking'>Staking</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock
							desc='add a variable with validator alias'
							code={`VAL_ALIAS="itrocket" # alias of validator you want to stake to`}
						/>
						<CodeBlock
							desc='or with validator address'
							code={`VAL_ADDRESS="tnam1qxkapjmrhxta0w75majjawv0ulc8g4trtqdt0tnc" # address of validator you want to stake to`}
						/>
						<CodeBlock
							desc='export variables'
							code={`echo "export VAL_ALIAS="$VAL_ALIAS"" >> $HOME/.bash_profile \
							echo "export VAL_ADDRESS="$VAL_ADDRESS"" >> $HOME/.bash_profile \
							source $HOME/.bash_profile`}
						/>
						<CodeBlock
							desc='stake funds:'
							code={`namadac bond --source $WALLET --validator $VAL_ADDRESS --amount 10 --memo $MEMO`}
						/>
						<CodeBlock desc='check your user bonds:' code={`namada client bonds --owner $WALLET`} />
						<CodeBlock desc='check all bonded nodes:' code={`namada client bonded-stake`} />
						<CodeBlock
							desc='unbonding (validator alias can be used instead of address):'
							code={`namada client unbond --source $WALLET --validator $VAL_ADDRESS --amount 1.5 --memo $MEMO`}
						/>
						<CodeBlock
							desc='withdrawing unbonded tokens (available 6 epochs after unbonding):'
							code={`namada client withdraw --source $WALLET --validator $VAL_ADDRESS --memo $MEMO`}
						/>
					</div>
					
					<h2 id='multisign'>Multisign</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='generate key_1:' code={`namada wallet gen --alias $WALLET`} />
						<CodeBlock desc='generate key_2 and etc:' code={`namada wallet gen --alias $\{WALLET\}1`} />
						<CodeBlock
							desc='chech your public key:'
							code={`namada wallet find --alias $WALLET | awk '/Public key:/ {print $3}'`}
						/>
						<CodeBlock
							desc='init non-multisig account (single signer):'
							code={`namada client init-account --alias $\{WALLET\}-multisig --public-keys <WALLET-public-key> --signing-keys $WALLET --memo $MEMO`}
						/>
						<CodeBlock
							desc='init multisig account (at least 2 signers):'
							code={`namada client init-account --alias $\{WALLET\}1-multisig --public-keys <WALLET-public-key>,<WALLET1-public-key> --signing-keys $WALLET,$\{WALLET\}1 --threshold 2 --memo $MEMO`}
						/>
						<CodeBlock desc='create a folder for a transaction:' code={`mkdir tx_dumps`} />
						<CodeBlock
							desc='create transaction:'
							code={`namada client transfer --source $\{WALLET\}1-multisig --target $\{WALLET\}1 --token NAAN --amount 10 --signing-keys $WALLET,$\{WALLET\}1 --dump-tx --output-folder-path tx_dumps --memo $MEMO`}
						/>
						<CodeBlock
							desc='sign the transaction:'
							code={`namada client sign-tx --tx-path "<path-to-.tx-file>" --signing-keys $WALLET,$\{WALLET\}1 --owner $\{WALLET\}1-multisig --memo $MEMO`}
						/>
						<CodeBlock
							desc='save as a variable offline_signature 1:'
							code={`export SIGNATURE_ONE="<signature-file-name>"`}
						/>
						<CodeBlock
							desc='save as a variable offline_signature 2:'
							code={`export SIGNATURE_TWO="<signature-2-file-name>"`}
						/>
						<CodeBlock
							desc='submit transaction:'
							code={`namada client tx --tx-path "<path-to-.tx-file>" --signatures $SIGNATURE_ONE,$SIGNATURE_TWO --owner $\{WALLET\}1-multisig --gas-payer $WALLET --memo $MEMO`}
						/>
						<CodeBlock
							desc='changing the multisig threshold:'
							code={`namada client update-account --address $\{WALLET\}1-multisig --threshold 1 --signing-keys $WALLET,$\{WALLET\}1 --memo $MEMO`}
						/>
						<CodeBlock
							desc='check that the threshold has been updated correctly by running:'
							code={`namada client query-account --owner $\{WALLET\}1-multisig`}
						/>
						<CodeBlock
							desc='changing the public keys of a multisig account:'
							code={`namada client update-account --address $\{WALLET\}1-multisig --public-keys $\{WALLET\}2,$\{WALLET\}3,$\{WALLET\}4 --signing-keys $WALLET,$\{WALLET\}1 --memo $MEMO`}
						/>
						<CodeBlock
							desc='initialize an established account:'
							code={`namada client init-account --alias $\{WALLET\}1-multisig --public-keys $\{WALLET\}2,$\{WALLET\}3,$\{WALLET\}4  --signing-keys $WALLET,$\{WALLET\}1  --threshold 1 --memo $MEMO`}
						/>
					</div>

					<h2 id='masp'>MASP</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock
							desc='randomly generate a new spending key:'
							code={`namada wallet gen --shielded --alias $\{WALLET\}-shielded`}
						/>
						<CodeBlock
							desc='create a new payment address:'
							code={`namada wallet gen-payment-addr --key $\{WALLET\}-shielded --alias $\{WALLET\}-shielded-addr`}
						/>
						<CodeBlock
							desc='send a shielding transfer:'
							code={`namada client transfer --source $WALLET --target $\{WALLET\}-shielded-addr --token NAAN --amount 5 --memo $MEMO`}
						/>
						<CodeBlock desc='view balance:' code={`namada client balance --owner $\{WALLET\}-shielded`} />
						<CodeBlock
							desc='generate another spending key:'
							code={`namada wallet gen --shielded --alias $\{WALLET\}1-shielded`}
						/>
						<CodeBlock
							desc='create a payment address:'
							code={`namada wallet gen-payment-addr --key $\{WALLET\}1-shielded --alias $\{WALLET\}1-shielded-addr`}
						/>
						<CodeBlock
							desc='shielded transfers (once the user has a shielded balance, it can be transferred to another shielded address):'
							code={`namada client transfer  --source $\{WALLET\}-shielded --target $\{WALLET\}1-shielded-addr --token NAAN --amount 5 --signing-keys <your-implicit-account-alias> --memo $MEMO`}
						/>
						<CodeBlock
							desc='unshielding transfers (from a shielded to a transparent account):'
							code={`namada client transfer --source $\{WALLET\}-shielded --target $WALLET --token NAAN --amount 5 --signing-keys <your-implicit-account-alias> --memo $MEMO`}
						/>
					</div>

					<h2 id='validator-operations'>Validator operations</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock
							desc='check sync status and node info:'
							code={`curl http://127.0.0.1:26657/status | jq`}
						/>
						<CodeBlock desc='check balance:' code={`namada client balance --owner $ALIAS`} />
						<CodeBlock desc='check keys:' code={`namada wallet list`} />
						<CodeBlock
							desc='find your validator address:'
							code={`namada client find-validator --tm-address=$(curl -s localhost:26657/status | jq -r .result.validator_info.address) --node localhost:26657`}
						/>
						<CodeBlock
							desc='stake funds:'
							code={`namadac bond --source $WALLET --validator $VALIDATOR_ADDRESS --amount 10 --memo $MEMO`}
						/>
						<CodeBlock
							desc='self-bonding:'
							code={`namadac bond --validator $VALIDATOR_ADDRESS --amount 10 --memo $MEMO`}
						/>
						<CodeBlock
							desc='check your validator bond status:'
							code={`namada client bonds --owner $ALIAS`}
						/>
						<CodeBlock desc='check your user bonds:' code={`namada client bonds --owner $WALLET`} />
						<CodeBlock desc='check all bonded nodes:' code={`namada client bonded-stake`} />
						<CodeBlock desc='find all the slashes:' code={`namada client slashes`} />
						<CodeBlock
							desc='non-self unbonding (validator alias can be used instead of address):'
							code={`namada client unbond --source $WALLET --validator $VALIDATOR_ADDRESS --amount 1.5 --memo $MEMO`}
						/>
						<CodeBlock
							desc='self-unbonding:'
							code={`namada client unbond --validator $VALIDATOR_ADDRESS --amount 1.5 --memo $MEMO`}
						/>
						<CodeBlock
							desc='withdrawing unbonded tokens (available 6 epochs after unbonding):'
							code={`namada client withdraw --source $WALLET --validator $VALIDATOR_ADDRESS --memo $MEMO`}
						/>
						<CodeBlock
							desc='find your validator status:'
							code={`namada client validator-state --validator $VALIDATOR_ADDRESS`}
						/>
						<CodeBlock desc='check epoch:' code={`namada client epoch`} />
						<CodeBlock
							desc='unjail, you need to wait 2 epochs:'
							code={`namada client unjail-validator --validator $VALIDATOR_ADDRESS --node tcp://127.0.0.1:26657 --memo $MEMO`}
						/>
					</div>
					<h2 id='governance'>Governance</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='All proposals list:' code={`namadac query-proposal`} />
						<CodeBlock
							desc='Vote:'
							code={`namadac vote-proposal --proposal-id <PROPOSAL_ID> --vote yay --address $ADDRESS`}
						/>
					</div>
					<h2 id='sync-and-consensus'>Sync and Consensus</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='check logs:' code={`sudo journalctl -u namadad -f`} />
						<CodeBlock
							desc='check sync status and node info:'
							code={`curl http://127.0.0.1:26657/status | jq`}
						/>
						<CodeBlock
							desc='check consensus state:'
							code={`curl -s localhost:26657/consensus_state | jq .result.round_state.height_vote_set[0].prevotes_bit_array`}
						/>
						<CodeBlock desc='full consensus state:' code={`curl -s localhost:12657/dump_consensus_state`} />
						<CodeBlock
							desc='your validator votes (prevote):'
							code={`curl -s http://localhost:26657/dump_consensus_state | jq '.result.round_state.votes[0].prevotes' | grep $(curl -s http://localhost:26657/status | jq -r '.result.validator_info.address[:12]')`}
						/>
					</div>
				</>
			</div>
		</AnimatedSection>
	)
}

export default CheatSheet
