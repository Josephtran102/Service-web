import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Context } from '@context/context'
import { fetchNetInfo, fetchSnap, fetchStatus } from 'utils/fetchProject.js'
import CodeSnippet from './CodeSnippet'
import { Alert } from 'antd'
import AnimatedSection from './AnimatedSection'

const Upgrade = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const bin = project.bin
	const installBin = project.newInstallBin
	const updHeight = project?.updHeight
	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const [blockHeight, setBlockHeight] = useState(null)
	const [port, setPort] = useState(project.port)

	const status = () => {
		fetchStatus(name, type)
			.then(status => {
				setId(status.node_info.network)
				setBlockHeight(status.sync_info.latest_block_height)
			})
			.catch(err => {
				console.log(err)
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
				<title>{`Upgrade - ${projectName} | Services`}</title>
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
				{!updHeight ? (
					<p>Project has no upgrades yet</p>
				) : (
					<>
						<Alert
							message={`Upgrade height: ${updHeight}. Please don\`t upgrade before specified height.`}
							type='warning'
							showIcon
							closable
							style={{ width: 'fit-content' }}
						/>
						<p className='flex items-center gap-2'>
							<span></span>
							{/* <span className='divider__dot' />
							<span> Avg</span> */}
						</p>

						<h2 id='manual'>Manual upgrade</h2>
						<p className={styles.text_secondary}></p>
						<CodeSnippet
							theme={theme}
							code={`${installBin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
						<h2 id='auto'>Auto upgrade</h2>
						<p className={styles.text_secondary}>
							Don't kill the session with{' '}
							<code className={styles.kbd}>
								<kdb>CTRL+C</kdb>
							</code>{' '}
							before update completed, if you want to disconnect the session use
							'CTRL+B D' and when update is completed the session is killed
							automatically
						</p>
						<CodeSnippet
							theme={theme}
							code={`# Create update file and run script on tmux session, replace sudo password if needed
cd $HOME
tee ~/${name}-upgrade.sh > /dev/null <<EOF
#!/bin/bash
for ((;;)); do
  'height=$(curl -s localhost:${port}657/status | jq -r .result.sync_info.latest_block_height)'
  if ((height==$updHeight)); then
    systemctl stop $bin
    echo Upgrading node...
    ${installBin}
    systemctl restart ${bin}
    echo ${name} bin updated, restarting...
    break
  else
    echo Height: ${blockHeight}
  fi
  sleep 3
done
sleep 600
tmux kill-session
EOF
chmod u+x ${name}-upgrade.sh
tmux new -s ${name}-upgrade "sudo /bin/bash ${name}-upgrade.sh"
`}
						/>
					</>
				)}
			</div>
		</AnimatedSection>
	)
}

export default Upgrade
