import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@context/context'
import projects from '@store/projects'
import prettyMilliseconds from 'pretty-ms'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/CodeSnippet.jsx'
import { fetchNetInfo, fetchSnap } from 'utils/fetchProject.js'
import Head from 'next/head'
import { Typography } from 'antd'
import AnimatedSection from './AnimatedSection'

const { Paragraph } = Typography

const ProjectData = ({ name, type }) => {
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { bin, path, peerID, seedID, seedPort, peerPort, unsafeReset } = project
	explorer.current = project.explorer
	const wasm = useRef('false')
	const { theme } = useContext(Context)
	const [livePeers, setLivePeers] = useState('')
	const [livePeersCounter, setLivePeersCounter] = useState(null)
	const [intervalId, setIntervalId] = useState(null)
	const [snapInfo, setSnapInfo] = useState({
		height: null,
		size: '',
		time: '',
		pruning: '',
		indexer: '',
	})
	const PEERS = peerID
		? `${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}`
		: ''
	const LIVE_PEERS = peerID ? `"${PEERS}"` : `"${livePeers.slice(1)}"`
	const SEEDS = seedID
		? `${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}`
		: ''
	const gRPC = `${name}-${type}-grpc.itrocket.net:${
		peerPort ? peerPort.slice(0, 2) : ''
	}090`

	const status = () => {
		fetchStatus(name, type)
			.then(status => {
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
						livePeers.push(`${chainID}@${ip}:${port}`)
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

	return (
		<AnimatedSection>
			<Head>
				<title>{`${projectName} | Services`}</title>
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
				<h2 id='rpc'>RPC, API, gRPC</h2>
				<div className='flex flex-wrap gap-1 items-center'>
					<span>Public RPC: </span>
					<a
						href={`https://${name}-${type}-rpc.itrocket.net:443`}
						target='_blank'
						rel='noopener referrer'
					>
						{`https://${name}-${type}-rpc.itrocket.net:443`}
					</a>
					<Paragraph
						copyable={{
							text: `https://${name}-${type}-rpc.itrocket.net:443`,
							tooltips: false,
						}}
					/>
				</div>
				<div className='flex flex-wrap gap-1 items-center'>
					<span>Public API: </span>
					<a
						href={`https://${name}-${type}-api.itrocket.net:443`}
						target='_blank'
						rel='noopener referrer'
					>
						{`https://${name}-${type}-api.itrocket.net:443`}
					</a>
					<Paragraph
						copyable={{
							text: `https://${name}-${type}-api.itrocket.net:443`,
							tooltips: false,
						}}
					/>
				</div>
				<h3 id='gRPC'>gRPC:</h3>
				<CodeSnippet theme={theme} code={`${gRPC}`} />
				<h3 id='peer'>peers:</h3>
				<CodeSnippet
					theme={theme}
					code={`${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}`}
				/>
				<h3 id='seed'>seeds:</h3>
				<CodeSnippet theme={theme} code={SEEDS} />
				<h3 id='live-peers'>live peers:</h3>
				<p className={styles.text_secondary}>
					active peers: {livePeersCounter} (upd. every 10 sec)
				</p>
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
				<p className={styles.text_secondary}>
					height: <b className={styles.bold}>{snapInfo.height}</b>
					{' | '}
					<b className={styles.bold}>{`${snapInfo.time} ago`}</b>
					{' | '}
					size: <b className={styles.bold}>{`${snapInfo.size}B | `}</b>
					pruning: <b className={styles.bold}>{snapInfo.pruning}</b>
					{' | '} indexer: <b className={styles.bold}>{snapInfo.indexer}</b>
				</p>
				<CodeSnippet
					theme={theme}
					code={`sudo systemctl stop ${bin}

cp $HOME/${path}/data/priv_validator_state.json $HOME/${path}/priv_validator_state.json.backup

rm -rf $HOME/${path}/data ${
						wasm.current.includes('data') || wasm.current === 'false'
							? ''
							: `$HOME/${path}/wasm`
					}
curl https://${type}-files.itrocket.net/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

mv $HOME/${path}/priv_validator_state.json.backup $HOME/${path}/data/priv_validator_state.json

sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
				/>
				<h2 id='sync'>State Sync</h2>
				<p>
					If you don't want to wait for a long synchronization you can use our
					guide:
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
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1500));
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
					<p>Sorry, this project has no wasm folder yet</p>
				)}
			</div>
		</AnimatedSection>
	)
}

export default ProjectData
