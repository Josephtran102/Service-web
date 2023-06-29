import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@context/context'
import projects from 'data/projects'
import prettyMilliseconds from 'pretty-ms'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/UI/CodeSnippet.jsx'
import { fetchSnap } from '@utils/fetchProject.js'
import Head from 'next/head'
import { Typography } from 'antd'
import AnimatedSection from '../AnimatedSection'
import useNetInfo from 'hooks/useNetInfo'
const { Paragraph } = Typography

const CosmosAPI = ({ name, type }) => {
	const project = projects[type][name]
	const { livePeers, livePeersCounter } = useNetInfo(name, type)
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { bin, path, peerID, seedID, seedPort, peerPort, unsafeReset, chainID, ecosystem, evmRPC } = project
	explorer.current = project.explorer
	const wasm = useRef('false')
	const { theme } = useContext(Context)
	const [pruning, setPruning] = useState('')
	const [indexer, setIndexer] = useState(null)
	const [snapHeight, setSnapHeight] = useState(null)
	const [snapSize, setSnapSize] = useState('')
	const [snapTime, setSnapTime] = useState()

	const PEERS = peerID ? `${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}` : ''
	const LIVE_PEERS = peerID ? `"${PEERS}"` : `"${livePeers.slice(1)}"`
	const SEEDS = seedID ? `${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}` : ''
	const gRPC = `${name}-${type}-grpc.itrocket.net:${peerPort ? peerPort.slice(0, 2) : ''}090`

	const snap = () => {
		fetchSnap(name, type)
			.then(data => {
				setSnapHeight(data.SnapshotHeight)
				setSnapSize(data.SnapshotSize)
				setPruning(data.pruning)
				setIndexer(data.indexer)

				if (data.WasmPath !== 'false') {
					wasm.current = data.WasmPath
				}

				let time = data.SnapshotBlockTime
				time = Date.parse(time.concat(':00'))
				time = Date.now() - time
				setSnapTime(prettyMilliseconds(time, { compact: true }))
			})
			.catch(err => {
				console.log(err)
			})
	}

	const fetchData = async () => {
		snap()
	}

	useEffect(() => {
		snap()
		fetchData()
		const intervalId = setInterval(fetchData, 10000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<AnimatedSection>
			<Head>
				<title>{`${projectName} - Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<h2 id='rpc'>RPC, API, gRPC</h2>
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
						<>Public API: </>
						<a href={`https://${name}-${type}-api.itrocket.net:443`} target='_blank' rel='noopener referrer'>
							{`https://${name}-${type}-api.itrocket.net:443`}
						</a>
						<Paragraph
							copyable={{
								text: `https://${name}-${type}-api.itrocket.net:443`,
								tooltips: false
							}}
						/>
					</div>
					{evmRPC !== undefined ? (
						<div className='flex flex-wrap gap-1 items-center'>
							<>Public EVM RPC: </>
							<a href={`${evmRPC}`} target='_blank' rel='noopener referrer'>
								{`${evmRPC}`}
							</a>
							<Paragraph
								copyable={{
									text: `${evmRPC}`,
									tooltips: false
								}}
							/>
						</div>
					) : null}
				</div>
				<h3 id='grpc'>gRPC:</h3>
				<CodeSnippet theme={theme} code={`${gRPC}`} />
				<h3 id='peer'>peers:</h3>
				<CodeSnippet theme={theme} code={`${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}`} />
				{SEEDS == '' ? (
					''
				) : (
					<div>
						<h3 id='seed'>seeds:</h3>
						<CodeSnippet theme={theme} code={SEEDS} />
					</div>
				)}
				<h3 id='live-peers'>live peers:</h3>
				<p className={styles.text_secondary}>active peers: {livePeersCounter} (upd. every 10 sec)</p>
				<CodeSnippet
					theme={theme}
					code={`PEERS=${LIVE_PEERS}
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/${path}/config/config.toml`}
				/>
				<h3 id='addrbook'>addrbook:</h3>
				<p className={styles.text_secondary}>updates every hour</p>
				<CodeSnippet
					theme={theme}
					code={`wget -O $HOME/${path}/config/addrbook.json https://${type}-files.itrocket.net/${name}/addrbook.json`}
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
							{' | '}
							pruning: <b className={styles.bold}>{pruning}</b>
							{' | '} indexer: <b className={styles.bold}>{indexer}</b>
						</p>
						<CodeSnippet
							theme={theme}
							code={`sudo systemctl stop ${bin}

cp $HOME/${path}/data/priv_validator_state.json $HOME/${path}/priv_validator_state.json.backup

rm -rf $HOME/${path}/data ${wasm.current.includes('data') || wasm.current === 'false' ? '' : `$HOME/${path}/wasm`}
curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

mv $HOME/${path}/priv_validator_state.json.backup $HOME/${path}/data/priv_validator_state.json

sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
					</>
				)}
				<h2 id='sync'>State Sync</h2>
				<p className={styles.text_secondary}>If you don't want to wait for a long synchronization you can use:</p>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop ${bin}

cp $HOME/${path}/data/priv_validator_state.json $HOME/${path}/priv_validator_state.json.backup
${bin} ${unsafeReset} --home $HOME/${path}

peers="${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"  
SNAP_RPC="https://${name}-${type}-rpc.itrocket.net:443"

sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$peers\\"/" $HOME/${path}/config/config.toml 

LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height);
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000));
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) 

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH && sleep 2

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1true| ;
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\\1\\"$SNAP_RPC,$SNAP_RPC\\"| ;
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\\1$BLOCK_HEIGHT| ;
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\\1\\"$TRUST_HASH\\"| ;
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\\1\\"\\"|" $HOME/${path}/config/config.toml
${
	wasm.current !== 'false'
		? `
curl https://${type}-files.itrocket.net/${name}/wasm_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasm.current}`
		: ``
}
mv $HOME/${path}/priv_validator_state.json.backup $HOME/${path}/data/priv_validator_state.json

sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
				/>
				<h2 id='wasm'>Wasm</h2>
				{wasm.current !== 'false' ? (
					<>
						<p className={styles.text_secondary}>updates every hour</p>
						<CodeSnippet
							theme={theme}
							code={`curl https://${type}-files.itrocket.net/${name}/wasm_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasm.current} 
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
					</>
				) : (
					<p>Sorry, this project does not support WebAssembly.</p>
				)}
			</div>
		</AnimatedSection>
	)
}

export default CosmosAPI
