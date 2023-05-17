import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Context } from '@context/context'
import { fetchNetInfo, fetchSnap, fetchStatus } from 'utils/fetchProject.js'
import CodeSnippet from './CodeSnippet'
import { Alert, Breadcrumb, Input, Space } from 'antd'
import AnimatedSection from './AnimatedSection'
import Link from 'next/link'
import { HomeOutlined } from '@ant-design/icons'

const Upgrade = props => {
	const name = props.name
	const type = props.type
	const project = projects[type][name]
	const explorer = useRef()
	const projectName =
		project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const bin = project.bin
	const installBin = project.newInstallBin
	const isEmpty = installBin === undefined ? true : false
	let indexOfMv, mvLine, path, beforeMv
	if (!isEmpty) {
		indexOfMv = installBin
			.split('\n')
			.findIndex(
				line =>
					line.trim().startsWith('mv') || line.trim().startsWith('sudo mv')
			)
		mvLine = installBin
			.split('\n')
			.find(line => line.trim().startsWith('sudo mv'))

		path = indexOfMv !== -1 ? mvLine.split(' ')[2] : ''
		beforeMv = installBin.split('\n').slice(0, indexOfMv).join('\n')
		beforeMv = beforeMv.split('\n').join(' && \\\n')
		beforeMv = beforeMv + ' && \\\n'
	}

	const updHeight = project?.updHeight
	explorer.current = project.explorer
	const { theme } = useContext(Context)
	const [blockHeight, setBlockHeight] = useState(null)
	const [port, setPort] = useState(project.port)
	const [inputStatus, setInputStatus] = useState('')

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

	const fetchData = () => {
		status()
		netInfo()
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

	const handlePort = e => {
		let onlyNumbers = /^\d+$/
		if (onlyNumbers.test(e.target.value) || e.target.value === '') {
			setPort(e.target.value)
			setInputStatus('')
		} else {
			setInputStatus('error')
		}
	}

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
				<Breadcrumb
					style={{ color: theme == 'dark' ? '#fff' : '#000' }}
					items={[
						{
							title: (
								<Link href='/'>
									<HomeOutlined />
								</Link>
							),
						},
						{
							title: <Link href='/services/'>Services</Link>,
						},
						{
							title: `${projectName}`,
						},
					]}
				/>
				<></>
				{!updHeight ? (
					<p style={{ marginBlock: '8px' }}>Project has no upgrades yet</p>
				) : (
					<>
						{updHeight == 0 ? (
							''
						) : (
							<>
								<Alert
									message={`Upgrade height: ${updHeight}. Please don\`t upgrade before specified height.`}
									type='info'
									showIcon
									closable
									style={{ width: 'fit-content', marginTop: '5px' }}
								/>
								<p className='flex items-center gap-2'>
									<span></span>
									{/* <span className='divider__dot' />
							<span> Avg</span> */}
								</p>
							</>
						)}
						<h2 id='manual'>Manual upgrade</h2>
						<p className={styles.text_secondary}></p>
						<CodeSnippet
							theme={theme}
							code={`${installBin}
sudo systemctl restart ${bin} && sudo journalctl -u ${bin} -f`}
						/>
						{updHeight == 0 || indexOfMv === -1 ? (
							''
						) : (
							<>
								<h2 id='auto'>Auto upgrade</h2>
								{/* <Space direction='vertical' className='my-2'>
									<span className={styles}>Port</span>
									<Input
										className={styles.input}
										status={inputStatus}
										defaultValue={port}
										maxLength={2}
										style={{ maxWidth: '45px' }}
										onChange={handlePort}
									/>
								</Space> */}
								<p style={{ marginTop: '5px' }}>
									Prepare the binary and run the script
								</p>

								<Alert
									message={
										<p>
											Don't kill the session with{' '}
											<kbd className={styles.kbd}>CTRL+C</kbd> before update
											completed, if you want to disconnect the session use{' '}
											<kbd className={styles.kbd}>CTRL+B D</kbd>{' '}
										</p>
									}
									type='warning'
									showIcon
									closable
									style={{ width: 'fit-content', marginBlock: '5px' }}
								/>
								<CodeSnippet
									theme={theme}
									code={`${beforeMv}tmux new -s ${name}-upgrade "bash <(curl -s https://raw.githubusercontent.com/itrocket-team/testnet_guides/main/utils/autoupgrade/upgrade.sh) -u "${updHeight}" -b ${bin} -n "${path}" -p ${name}"`}
								/>
							</>
						)}
					</>
				)}
			</div>
		</AnimatedSection>
	)
}

export default Upgrade
