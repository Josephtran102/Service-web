import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@context/context'
import Head from 'next/head'
import { Typography } from 'antd'
const { Paragraph } = Typography

import projects from 'data/projects'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/UI/CodeSnippet.jsx'
import AnimatedSection from '@components/AnimatedSection'
import useNetInfo from 'hooks/useNetInfo'
import useFetchSnapInfo from '@hooks/useFetchSnapInfo'

const CosmosAPI = ({ name, type }) => {
	const project = projects[type][name]
	const { livePeers, livePeersCounter } = useNetInfo(name, type)

	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { bin, path, peerID, seedID, seedPort, peerPort, unsafeReset, evmRPC, stateSync } = project
	explorer.current = project.explorer

	const { theme } = useContext(Context)

	const PEERS = peerID ? `${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}` : ''
	const LIVE_PEERS = peerID ? `"${PEERS}"` : `"${livePeers.slice(1)}"`
	const SEEDS = seedID ? `${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}` : ''
	const gRPC = `${name}-${type}-grpc.itrocket.net:${peerPort ? peerPort.slice(0, 2) : ''}090`

	const { snapHeight, snapSize, snapTime, pruning, indexer, wasmPath } = useFetchSnapInfo(name, type)

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
						<span>RPC: </span>
						<a href={`https://${name}-${type}-rpc.itrocket.net`} target='_blank' rel='noopener referrer'>
							{`https://${name}-${type}-rpc.itrocket.net`}
						</a>
						<Paragraph
							copyable={{
								text: `https://${name}-${type}-rpc.itrocket.net`,
								tooltips: false
							}}
						/>
					</div>
					{name === 'namada' ? (
						<></>
					) : (
						<>
							<div className='flex flex-wrap gap-1 items-center'>
								API:
								<a
									href={`https://${name}-${type}-api.itrocket.net`}
									target='_blank'
									rel='noopener referrer'
								>
									{`https://${name}-${type}-api.itrocket.net`}
								</a>
								<Paragraph
									copyable={{
										text: `https://${name}-${type}-api.itrocket.net`,
										tooltips: false
									}}
								/>
							</div>
						</>
					)}
					{evmRPC !== undefined ? (
						<div className='flex flex-wrap gap-1 items-center'>
							<>JSON-RPC: </>
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
				{name === 'namada' ? (
					<></>
				) : (
					<>
						<h3 id='grpc'>gRPC:</h3>
						<CodeSnippet theme={theme} code={`${gRPC}`} />
					</>
				)}
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

rm -rf $HOME/${path}/data ${wasmPath?.includes('data') || !wasmPath ? '' : `$HOME/${path}/wasmPath`}
curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

mv $HOME/${path}/priv_validator_state.json.backup $HOME/${path}/data/priv_validator_state.json

sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
					</>
				)}
				{stateSync === 'false' ? (
					<></>
				) : (
					<>
						<h2 id='sync'>State Sync</h2>
						<p className={styles.text_secondary}>
							If you don't want to wait for a long synchronization you can use:
						</p>
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
	!wasmPath
		? `
curl https://${type}-files.itrocket.net/${name}/wasmPath_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasmPath}`
		: ``
}
mv $HOME/${path}/priv_validator_state.json.backup $HOME/${path}/data/priv_validator_state.json

sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
					</>
				)}
				<h2 id='wasm'>Wasm</h2>
				{wasmPath !== '' && wasmPath !== 'false' ? (
					<>
						<p className={styles.text_secondary}>updates every hour</p>
						<CodeSnippet
							theme={theme}
							code={`curl https://${type}-files.itrocket.net/${name}/wasmPath_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasmPath} 
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
