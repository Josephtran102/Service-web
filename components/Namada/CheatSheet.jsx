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
						<CodeBlock
							desc='create a new keypair:'
							code={`KEY_ALIAS="keysha"; namada wallet key gen --alias $KEY_ALIAS`}
						/>
						<CodeBlock
							desc='restore executed key:'
							code={`namada wallet key restore --alias $KEY_ALIAS --hd-path default`}
						/>
						<CodeBlock desc='view your address:' code={`namada wallet address find --alias $KEY_ALIAS`} />
						<CodeBlock desc='add some tokens using faucet:' code={`https://faucet.heliax.click/`} />
						<CodeBlock desc='check balance:' code={`namada client balance --owner $KEY_ALIAS`} />
						<CodeBlock desc='check keys:' code={`namada wallet key list`} />
						<CodeBlock
							desc='send payment from your address to validator-1:'
							code={`namada client transfer --source <SENDER_ADDRESS> --target <RECEIVER_ADDRESS> --token NAM --amount 10 --signing-keys $KEY_ALIAS`}
						/>
					</div>

					<h2 id='multisign'>Multisign</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock desc='generate key_1:' code={`namadaw key gen --alias my-key1`} />
						<CodeBlock desc='generate key_2 and etc:' code={`namadaw key gen --alias my-key2`} />
						<CodeBlock
							desc='an implicit address can also be generated:'
							code={`namadaw address gen --alias my-address`}
						/>
						<CodeBlock
							desc='init non-multisig account (single signer):'
							code={`namadac init-account --alias my-multisig-alias --public-keys my-key1 --signing-keys my-key1`}
						/>
						<CodeBlock
							desc='init multisig account (at least 2 signers):'
							code={`namadac init-account --alias my-multisig-alias --public-keys my-key1,my-key2 --signing-keys my-key1,my-key2 --threshold 2`}
						/>
						<CodeBlock desc='submitting a multisignature transaction:' code={`mkdir tx_dumps`} />
						<CodeBlock
							desc='create transaction:'
							code={`namadac transfer --source my-multisig-alias --target some-established-account-alias --token NAM --amount 100 --signing-keys my-key1 --dump-tx --output-folder-path tx_dumps`}
						/>
						<CodeBlock
							desc='signing the transaction:'
							code={`namadac sign-tx --tx-path "<path-to-file>" --signing-keys my-key1 --owner my-multisig-alias`}
						/>
						<CodeBlock
							desc='save as a variable offline_signature:'
							code={`export SIGNATURE_ONE="offline_signature_FB7246E3FC43F59D8AEEC234EBFDB9DF1AC9BB7B14E536D05A7E2617CA41D4CD_0.tx"`}
						/>
						<CodeBlock
							desc='submit transaction:'
							code={`namadac tx --tx-path "tx_dumps/a45ef98a817290d6fc0efbd480bf66647ea8061aee1628ce09b4af4f4eeed1c2.tx" --signatures $SIGNATURE_ONE --signatures $SIGNATURE_TWO --owner my-multisig-alias --gas-payer my-key1`}
						/>
						<CodeBlock
							desc='changing the multisig threshold:'
							code={`namadac update-account --address my-multisig-address --threshold 1 --signing-keys my-key1,my-key2`}
						/>
						<CodeBlock
							desc='one can check that the threshold has been updated correctly by running:'
							code={`namadac query-account --owner my-multisig-address`}
						/>
						<CodeBlock
							desc='changing the public keys of a multisig account:'
							code={`namadac update-account --address my-multisig-address --public-keys my-key3,my-key4,my-key5 --signing-keys my-key1,my-key2`}
						/>
						<CodeBlock
							desc='initialize an established account:'
							code={`namada client init-account --alias establishment --public-keys keysha  --signing-keys keysha  --threshold 1`}
						/>
					</div>

					<h2 id='masp'>MASP</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock
							desc='randomly generate a new spending key:'
							code={`namadaw masp gen-key --alias <your-spending-key-alias>`}
						/>
						<CodeBlock
							desc='create a new payment address:'
							code={`namadaw masp gen-addr  --key <your-spending-key-alias> --alias <your-payment-address-alias>`}
						/>
						<CodeBlock
							desc='send your shielding transfer:'
							code={`namadac transfer --source <your-established-account-alias>  --target <your-payment-address-alias>  --token btc --amount <amount-to-shield>`}
						/>
						<CodeBlock desc='view balance:' code={`namadac balance --owner <your-spending-key-alias>`} />
						<CodeBlock
							desc='shielded transfers (once the user has a shielded balance, it can be transferred to another shielded address):'
							code={`namadac transfer  --source <your-spending-key-alias> --target <destination-payment-address>  --token btc --amount <amount-to-transfer> --signing-keys <your-implicit-account-alias>`}
						/>
						<CodeBlock
							desc='unshielding transfers (it is also possible to transfer the balance to a transparent account):'
							code={`namadac transfer --source <your-spending-key-alias> --target <some-transparent-address-alias> --token btc  --amount <amount-to-unshield> --signing-keys <your-implicit-account-alias>`}
						/>
					</div>

					<h2 id='validator-operations'>Validator operations</h2>
					<div className='flex flex-col gap-y-2'>
						<CodeBlock
							desc='check sync status and node info:'
							code={`curl http://127.0.0.1:26657/status | jq`}
						/>
						<CodeBlock desc='check balance:' code={`namada client balance --owner $ALIAS`} />
						<CodeBlock desc='check keys:' code={`namada wallet key list`} />
						<CodeBlock
							desc='stake funds:'
							code={`namadac bond --source $ALIAS --validator $ALIAS --amount 1000`}
						/>
						<CodeBlock
							desc='check your validator bond status:'
							code={`namada client bonds --owner $ALIAS`}
						/>
						<CodeBlock desc='check all bonded nodes:' code={`namada client bonded-stake`} />
						<CodeBlock desc='find all the slashes:' code={`namada client slashes`} />
						<CodeBlock
							desc='non-self unbonding:'
							code={`namada client unbond --source aliace --validator $ALIAS --amount 1.2`}
						/>
						<CodeBlock
							desc='self-unbonding:'
							code={`namada client unbond --validator $ALIAS --amount 0.3`}
						/>
						<CodeBlock
							desc='withdrawing unbonded tokens:'
							code={`namada client withdraw --source aliace --validator $ALIAS`}
						/>
						<CodeBlock
							desc='Find Your Validator:'
							code={`namadac find-validator --tm-address=$(curl -s localhost:26657/status | jq -r .result.validator_info.address) --node localhost:26657`}
						/>
						<CodeBlock
							desc='Check epoch:'
							code={`namada client epoch`}
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
