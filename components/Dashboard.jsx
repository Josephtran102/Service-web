import { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import { fetchStatus } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import { currentProject } from 'utils/currentProjectByURL'
import projects from 'data/projects'
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Segmented } from 'antd'
import ProjectsModal from './ProjectsModal'

export default function Dashboard(props) {
	const { theme, toggleTheme } = useContext(Context)
	const router = useRouter()
	const [opacity, setOpacity] = useState(0)
	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(styles.pending)
	const [explorer, setExplorer] = useState()
	const [blockHeight, setBlockHeight] = useState(null)
	const [chainID, setChainID] = useState()
	const [value, setValue] = useState()
	const [intervalId, setIntervalId] = useState(null)
	const [ecosystem, setEcosystem] = useState(null)
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

		if (isCurrent) {
			setName(project.name)
			setExplorer(projects[type][name].explorer)
			setChainID(project?.chainID)
			setEcosystem(projects[type][name].ecosystem)
		}

		const URL = window.location.href
		if (URL.indexOf('installation') > -1) {
			setValue('Installation')
		} else if (URL.indexOf('upgrade') > -1) {
			setValue('Upgrade')
		} else if (URL.indexOf('cheat') > -1) {
			setValue('Cheat-Sheet')
		} else {
			setValue('API & Sync')
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
		const section = value === 'API & Sync' ? '' : value
		const href = `/services/${curProjectType.current}/${curProjectName.current}/${section.toLowerCase()}`
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
						<div className={styles.stats}>
							<ProjectsModal name={name} type='services' />

							{ecosystem == 'false' ? (
								''
							) : (
								<>
									<span>
										<b className={styles.bold}>Chain ID: </b>
										{chainID}
									</span>
									<span>
										<b className={styles.bold}>Block Height: </b> {blockHeight}{' '}
									</span>
									<span>
										<b className={styles.bold}>RPC Status:</b> <span className={`${styles.dot} ${isActive}`} />
									</span>{' '}
								</>
							)}

							<span>
								{explorer === undefined ? (
									<a
										className='flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-400'
										href={`https://${currentProject().type}.itrocket.net/${name}/staking`}
										target='_blank'
										rel='noopener referrer'
									>
										<SearchOutlined />
										Explorer
									</a>
								) : (
									<a
										className='flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-400'
										href={explorer}
										target='_blank'
										rel='noopener referrer'
									>
										<SearchOutlined style={{ color: '#2982e7' }} />
										Explorer
									</a>
								)}
							</span>
						</div>
					</div>
					{ecosystem === 'false' ? (
						''
					) : (
						<Segmented
							value={value}
							defaultValue={curProjectType.current}
							options={['API & Sync', 'Installation', 'Upgrade', 'Cheat-Sheet']}
							onChange={handleTabClick}
							style={{
								marginBottom: '10px',
								marginLeft: '5px',
								backgroundColor: theme === 'dark' ? '#6b6969' : '#e0e0e0',
								width: 'fit-content'
							}}
							className={styles.mobileSegmented}
						/>
					)}

					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
