import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@context/context'
import projects from '@store/projects'
import prettyMilliseconds from 'pretty-ms'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/CodeSnippet.jsx'
import { fetchNetInfo, fetchSnap, fetchStatus } from 'utils/fetchProject.js'
import Head from 'next/head'
import { Typography } from 'antd'
const { Paragraph } = Typography

const ProjectData = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const desc = project.desc
	const website = project.website
	const bin = project.bin
	const guide_links = project.guide_links
	const path = project.path
	const peerID = project.peerID
	const seedID = project.seedID
	const seedPort = project.seedPort
	const peerPort = project.peerPort
	explorer.current = project.explorer
	let wasm = useRef('false')

	const { theme } = useContext(Context)
	const [isActive, setIsActive] = useState(styles.pending)
	const [blockHeight, setBlockHeight] = useState(null)
	const [id, setId] = useState('')
	const [livePeers, setLivePeers] = useState('')
	const [livePeersCounter, setLivePeersCounter] = useState(null)
	const [snapHeight, setSnapHeight] = useState(null)
	const [snapSize, setSnapSize] = useState('')
	const [snapTime, setSnapTime] = useState()
	const [pruning, setPruning] = useState('')
	const [indexer, setIndexer] = useState(null)
	const items = [
		{
			key: 'part-1',
			href: '#about',
			title: 'About',
		},
		{
			key: 'part-2',
			href: '#guide',
			title: 'Guide',
		},
		{
			key: 'part-3',
			href: '#rpc',
			title: 'RPC, API, gRPC',
		},
		{
			key: 'part-4',
			href: '#peer',
			title: 'Peers, seeds',
		},
		{
			key: 'part-5',
			href: '#snap',
			title: 'Snapshot',
		},
		{
			key: 'part-6',
			href: '#sync',
			title: 'State Sync',
		},
		{
			key: 'part-7',
			href: '#wasm',
			title: 'Wasm',
		},
	]

	const status = () => {
		fetchStatus(name, type)
			.then(status => {
				setId(status.node_info.network)
				setBlockHeight(status.sync_info.latest_block_height)
				setIsActive(styles.active)
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
				const livePeers = []
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
						livePeers.push(`${id}@${ip}:${port}`)
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

	const renderLinks = () => {
		let links = []
		for (let key in guide_links) {
			links.push(
				<span>
					<span>{key.charAt(0).toUpperCase() + key.slice(1)} - </span>
					<a href={guide_links[key]} target='_blank' rel='noopener referrer'>
						{guide_links[key]}
					</a>
					<br />
				</span>
			)
		}
		return links
	}

	return (
		<>
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
				<div className='flex gap-1 items-center'>
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
				<div className='flex gap-1 items-center'>
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
				<div className='flex gap-1 items-center'>
					<span>Public gRPC: </span>
					<a
						href={`https://${name}-${type}-grpc.itrocket.net:443`}
						target='_blank'
						rel='noopener referrer'
					>
						{`https://${name}-${type}-grpc.itrocket.net:443`}
					</a>
					<Paragraph
						copyable={{
							text: `https://${name}-${type}-grpc.itrocket.net:443`,
							tooltips: false,
						}}
					/>
				</div>
				<h3 id='peer'>peers:</h3>
				<CodeSnippet
					theme={theme}
					code={`${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}`}
				/>
				<h3>seeds:</h3>
				<CodeSnippet
					theme={theme}
					code={`${seedID}@${name}-${type}-seed.itrocket.net:${seedPort}`}
				/>
				<h3>live peers:</h3>
				<p className={styles.text_secondary}>
					active peers: {livePeersCounter} (upd. every 10 sec)
				</p>
				<CodeSnippet
					theme={theme}
					code={`PEERS="${peerID}@${name}-${type}-peer.itrocket.net:${peerPort}${livePeers}"
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/${path}/config/config.toml`}
				/>

				<h3>addrbook:</h3>
				<p className={styles.text_secondary}>updates every hour</p>
				<CodeSnippet
					theme={theme}
					code={`wget -O $HOME/${path}/config/addrbook.json https://files.itrocket.net/${type}/${name}/addrbook.json`}
				/>
				<h2 id='snap'>Snapshot </h2>
				<p className={styles.text_secondary}>
					<b className={styles.bold}>height: </b> {snapHeight}{' '}
					{` (${snapTime} ago)`} {' | '}
					<b className={styles.bold}>size: </b> {`${snapSize}B | `}
					<b className={styles.bold}>pruning: </b> {pruning} {' | '}
					<b className={styles.bold}>indexer: </b> {indexer}
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
curl https://files.itrocket.net/${type}/${name}/snap_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${path}

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
${bin} tendermint unsafe-reset-all --home $HOME/${path}

peers="${peerID}@${name}-testnet-peer.itrocket.net:443${livePeers}"  
SNAP_RPC="https://${name}-${type}-rpc.itrocket.net:443"

sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \\"$peers\\"/" $HOME/${path}/config/config.toml 

LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height);
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000));
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
curl https://files.itrocket.net/${type}/${name}/wasm_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasm.current}`
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
							code={`curl https://files.itrocket.net/${type}/${name}/wasm_${name}.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/${wasm.current} 
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
					</>
				) : (
					<p>Sorry, this project has no wasm folder yet</p>
				)}
			</div>
		</>
	)
}

export default ProjectData
