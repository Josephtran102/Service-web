import { Context } from '@context/context'
import { Typography } from 'antd'
import Head from 'next/head'
import { useContext, useRef } from 'react'
const { Paragraph } = Typography

import AnimatedSection from '@components/AnimatedSection'
import CodeBlock from '@components/UI/CodeBlock'
import CodeSnippet from '@components/UI/CodeSnippet.jsx'
import useFetchSnapInfo from '@hooks/useFetchSnapInfo'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import useNetInfo from 'hooks/useNetInfo'

const API = ({ name, type }) => {
	const project = projects[type][name]
	const { livePeers, livePeersCounter } = useNetInfo(name, type)
	const tcpLivePeers = livePeers.split(',').map(s => (s ? 'tcp://' + s : ''))
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { bin, path, peerID, seedID, seedPort, peerPort, unsafeReset, evmRPC, stateSync } = project
	explorer.current = project.explorer
	const wasm = useRef('false')
	const { theme } = useContext(Context)

	const PEERS = peerID ? `tcp://${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${tcpLivePeers}` : ''
	const LIVE_PEERS = peerID ? `"${PEERS}"` : `"${tcpLivePeers.slice(1)}"`
	const SEEDS = seedID ? `${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}` : ''
	const gRPC = `${name}-${type}-grpc.itrocket.net:${peerPort ? peerPort.slice(0, 2) : ''}090`

	const { snapHeight, snapSize, snapTime } = useFetchSnapInfo(name, type)

	return (
		<AnimatedSection>
			<Head>
				<title>{`${projectName} - Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#19191A' }}
			>
				<h2 id='rpc'>RPC, Peers, Seed, Addrbook, Genesis</h2>
				<div className='flex flex-col flex-wrap gap-1 mb-1'>
					<div className='flex flex-wrap gap-1 items-center'>
						<span>Public RPC: </span>
						<a href={`https://${name}-${type}-rpc.itrocket.net:443`} target='_blank' rel='noopener referrer'>
							{`https://${name}-${type}-rpc.itrocket.net:443`}
						</a>
						<Paragraph
							copyable={{
								text: `https://${name}-${type}-rpc.itrocket.net:443`,
								tooltips: false
							}}
						/>
					</div>
					<div className='flex flex-wrap gap-1 items-center'>
						<span>Public RPC (node operations): </span>
						<a
							href={`tcp://${name}-${type}-tcprpc.itrocket.net:33657`}
							target='_blank'
							rel='noopener referrer'
						>
							{`tcp://${name}-${type}-tcprpc.itrocket.net:33657`}
						</a>
						<Paragraph
							copyable={{
								text: `tcp://${name}-${type}-tcprpc.itrocket.net:33657`,
								tooltips: false
							}}
						/>
					</div>
					<div className='flex flex-wrap gap-1 items-center'>
						<span>Public indexer: </span>
						<a
							href={`https://${name}-${type}-indexer.itrocket.net/block/last`}
							target='_blank'
							rel='noopener referrer'
						>
							{`https://${name}-${type}-indexer.itrocket.net/block/last`}
						</a>
						<Paragraph
							copyable={{
								text: `https://${name}-${type}-indexer.itrocket.net/block/last`,
								tooltips: false
							}}
						/>
					</div>
				</div>

				<h3 id='peer'>peers:</h3>
				<CodeSnippet theme={theme} code={`${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}`} />
				{SEEDS == '' ? (
					''
				) : (
					<div>
						<h3 id='seed'>seed:</h3>
						<CodeSnippet theme={theme} code={SEEDS} />
					</div>
				)}
				<h3 id='live-peers'>live peers:</h3>
				<p className={styles.text_secondary}>active peers: {livePeersCounter} (upd. every 10 sec)</p>
				<CodeSnippet
					theme={theme}
					code={`PEERS=${LIVE_PEERS}
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/${path}/config.toml`}
				/>
				<h3 id='addrbook'>addrbook:</h3>
				<p className={styles.text_secondary}>updates every hour</p>
				<CodeSnippet
					theme={theme}
					code={`wget -O $HOME/${path}/cometbft/config/addrbook.json https://${type}-files.itrocket.net/${name}/addrbook.json`}
				/>
				<h3 id='genesis'>genesis</h3>
				<CodeSnippet
					code={`wget -O $HOME/${path}/cometbft/config/genesis.json https://testnet-files.itrocket.net/namada/genesis.json`}
				/>

				<h2 id='snap'>Snapshot </h2>
				{snapHeight == undefined ? (
					<CodeSnippet theme={theme} code={`## Snapshot is not available yet`} />
				) : (
					<>
						<p>
							height: <b className={styles.bold}>{snapHeight}</b>
							{' | '}
							<b className={styles.bold}>{`${snapTime} ago`}</b>
							{' | '}
							size: <b className={styles.bold}>{`${snapSize}B`}</b>
						</p>
					</>
				)}
				<p className={styles.text_secondary}>updates every 4h</p>

				<CodeBlock
					desc='Download snapshot:'
					code={`cd $HOME
wget -O snap_namada.tar https://testnet-files.itrocket.net/namada/snap_namada.tar
`}
				/>
				<CodeBlock
					desc='Stop node and unpack snapshot:'
					code={`sudo systemctl stop namadad
cp $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup
rm -rf $HOME/.local/share/namada/shielded-expedition.88f17d1d14/db $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data
tar -xvf $HOME/snap_namada.tar -C $HOME/.local/share/namada/shielded-expedition.88f17d1d14
mv $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/priv_validator_state.json.backup $HOME/.local/share/namada/shielded-expedition.88f17d1d14/cometbft/data/priv_validator_state.json
`}
				/>
				<CodeBlock
					desc='Restart node:'
					code={`sudo systemctl restart namadad && sudo journalctl -u namadad -f`}
				/>
				<CodeBlock desc='Delete snap file:' code={`rm -rf $HOME/snap_namada.tar`} />
			</div>
		</AnimatedSection>
	)
}

export default API
