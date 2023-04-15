import { useContext, useEffect, useState } from 'react'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import { fetchStatus } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import { currentProject } from 'utils/currentProjectByURL'
import { CheckCircleTwoTone, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Tooltip } from 'antd'
import Tabs from './Tabs'

export default function Dashboard(props) {
	const router = useRouter()
	const [opacity, setOpacity] = useState(0)
	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(styles.pending)
	const [blockHeight, setBlockHeight] = useState(null)
	const { theme, toggleTheme } = useContext(Context)
	const [chainID, setChainID] = useState()
	const [explorer, setExplorer] = useState(null)
	const [intervalId, setIntervalId] = useState(null)

	useEffect(() => {
		const project = currentProject()
		const name = project.name
		const type = project.type
		setName(project.name)
		setExplorer(project.explorer)
		setChainID(project?.chainID)

		fetchStatus(name, type)
			.then(status => {
				setBlockHeight(status.sync_info.latest_block_height)
				setIsActive(styles.active)
			})
			.catch(err => {
				console.log(err)
				setIsActive(styles.inactive)
			})

		const id = setInterval(() => {
			fetchStatus(name, type)
				.then(status => {
					setBlockHeight(status.sync_info.latest_block_height)
					setIsActive(styles.active)
				})
				.catch(err => {
					console.log(err)
					setIsActive(styles.inactive)
				})
		}, 10000)

		setIntervalId(id)

		return () => {
			clearInterval(intervalId)
		}
	}, [router.pathname])

	useEffect(() => {
		setTimeout(() => {
			setOpacity(1)
		}, 1)
	}, [])

	return (
		<div style={{ opacity: opacity }}>
			<Header />

			<div className={styles.container}>
				<SideMenu intervalId={intervalId} />
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
								{chainID}
							</span>
							<span>
								<b className={styles.bold}>Block Height: </b> {blockHeight}{' '}
							</span>
							<span>
								<b className={styles.bold}>RPC Status:</b>{' '}
								<span className={`${styles.dot} ${isActive}`} />
							</span>
							<span>
								{explorer === undefined ? (
									<a
										className='flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-400'
										href={`https://${
											currentProject().type
										}.itrocket.net/${name}/staking`}
										target='_blank'
										rel='noopener referrer'
									>
										<SearchOutlined />
										Explorer
									</a>
								) : (
									<a
										className='flex items-center gap-2'
										href={`${explorer}`}
										target='_blank'
										rel='noopener referrer'
									>
										<SearchOutlined style={{ color: '#2982e7' }} />
										Explorer
									</a>
								)}
							</span>
						</p>
					</div>
					<Tabs />
					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
