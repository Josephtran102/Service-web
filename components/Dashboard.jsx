import { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import { fetchStatus } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import { currentProject } from 'utils/currentProjectByURL'
import { CheckCircleTwoTone, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Tooltip, Segmented } from 'antd'

export default function Dashboard(props) {
	const router = useRouter()
	const [opacity, setOpacity] = useState(0)
	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(styles.pending)
	const [blockHeight, setBlockHeight] = useState(null)
	const { theme, toggleTheme } = useContext(Context)
	const [chainID, setChainID] = useState()
	const [explorer, setExplorer] = useState(null)
	const [value, setValue] = useState()
	const [intervalId, setIntervalId] = useState(null)
	const curProjectName = useRef()
	const curProjectType = useRef()

	const status = (name, type, isCurrent) => {
		fetchStatus(name, type)
			.then(status => {
				if (isCurrent) {
					setBlockHeight(status.sync_info.latest_block_height)
					setIsActive(styles.active)
				}
			})
			.catch(err => {
				if (isCurrent) {
					console.log(err)
					setIsActive(styles.inactive)
				}
			})
	}

	useEffect(() => {
		let isCurrent = true
		const project = currentProject()
		const name = project.name
		const type = project.type
		curProjectName.current = name
		curProjectType.current = type
		setName(project.name)
		setExplorer(project.explorer)
		setChainID(project?.chainID)
		const URL = window.location.href
		if (URL.indexOf('installation') > -1) {
			setValue('installation')
		} else if (URL.indexOf('upgrade') > -1) {
			setValue('upgrade')
		} else if (URL.indexOf('cheat') > -1) {
			setValue('cheat-sheet')
		} else {
			setValue('services')
		}
		status(name, type, isCurrent)
		const intervalId = setInterval(() => {
			status(name, type, isCurrent)
		}, 10000)

		return () => {
			isCurrent = false
			clearInterval(intervalId)
		}
	}, [router.pathname])

	useEffect(() => {
		setTimeout(() => {
			setOpacity(1)
		}, 1)
	}, [])

	const handleTabClick = value => {
		setValue(value)
		const section = value === 'services' ? '' : value
		const href = `/services/${curProjectType.current}/${curProjectName.current}/${section}`
		router.push(href)
	}

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
					<Segmented
						block
						value={value}
						defaultValue={curProjectType.current}
						options={['services', 'installation', 'upgrade', 'cheat-sheet']}
						onChange={handleTabClick}
						style={{ marginBottom: '7px' }}
						className={styles.mobileSegmented}
					/>
					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
