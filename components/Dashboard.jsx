import { useContext, useEffect, useState } from 'react'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import { fetchNetInfo, fetchStatus, fetchVersion } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import { currentProject } from 'utils/currentProjectByURL'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'

export default function Dashboard(props) {
	const [opacity, setOpacity] = useState(0)
	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(styles.pending)
	const [blockHeight, setBlockHeight] = useState(null)
	const [version, setVersion] = useState()
	const { theme, toggleTheme } = useContext(Context)
	const [id, setId] = useState('')

	useEffect(() => {
		const name = currentProject().name
		const type = currentProject().type
		setName(currentProject().name)

		fetchVersion(name, type)
			.then(status => {
				let version = status.version
				if (version[0] == 'v') version = version.slice(1)
				setVersion(version)
			})
			.catch(err => {
				console.log(err)
			})

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

		setInterval(() => {
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
		}, 10000)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setOpacity(1)
		}, 1)
	}, [])

	// const netInfo = () => {
	// 	fetchNetInfo(name, type)
	// 		.then(info => {
	// 			const peers = info.peers
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }

	return (
		<div style={{ opacity: opacity }}>
			<Header />

			<div className={styles.container}>
				<SideMenu />
				<main className={styles.mainColumn__wrapper}>
					<div
						className={styles.projectInfoCard}
						style={{ backgroundColor: theme === 'light' ? '#fff' : '#171717' }}
					>
						<p className={styles.stats}>
							<span className='flex items-center gap-2'>
								<Tooltip title='Project is active'>
									<CheckCircleTwoTone twoToneColor='#52c41a' />
								</Tooltip>

								<b className={styles.bold}>
									{name.charAt(0).toUpperCase() + name.slice(1)}
								</b>
							</span>
							<span>
								<b className={styles.bold}>Chain ID: </b>
								{id}
							</span>
							<span>
								<b className={styles.bold}>Block Height: </b> {blockHeight}{' '}
							</span>
							<span>
								<b className={styles.bold}>RPC Status:</b>{' '}
								<span className={`${styles.dot} ${isActive}`} />
							</span>
							<span>
								<b className={styles.bold}>Bin: </b> v{version}
							</span>
						</p>
					</div>

					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
