import { useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'

import { currentProject } from 'utils/currentProjectByURL'
import projects from 'data/projects'
import { fetchStatus } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import ProjectsModal from './ProjectsModal'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import services from '@data/services'

export default function Dashboard(props) {
	const { theme, toggleTheme } = useContext(Context)
	const router = useRouter()
	const [opacity, setOpacity] = useState(0)
	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(styles.pending)
	const [explorer, setExplorer] = useState()
	const [blockHeight, setBlockHeight] = useState(null)
	const [chainID, setChainID] = useState()
	const [activeTab, setActiveTab] = useState()
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

		status(name, type, isCurrent)

		const sections = []
		services.map(section => {
			sections.push(section.key)
		})

		let currentSection = router.pathname.split('/').filter(Boolean).pop()
		if (sections.indexOf(currentSection) === -1) {
			currentSection = 'api'
		}
		setActiveTab(() => currentSection)

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

	const onChange = key => {
		if (key === 'api') key = ''
		const href = `/services/${curProjectType.current}/${curProjectName.current}/${key}`
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
						style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
					>
						<div className={styles.stats}>
							<ProjectsModal name={name} type='services' />

							{ecosystem == 'cosmos' && isActive !== styles.pending && (
								<>
									<div>
										<b className={styles.bold}>Chain ID: </b>
										<span>{chainID}</span>
									</div>

									<div className='flex gap-1'>
										<b className={styles.bold}>Block Height: </b>{' '}
										{isActive === styles.pending ? (
											<LoadingOutlined className='ml-5 mr-2' />
										) : (
											` ${blockHeight}`
										)}
									</div>
									<div>
										<b className={styles.bold}>RPC Status:</b>{' '}
										<span className={`${styles.dot} ${isActive}`} />
									</div>
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
					{ecosystem === 'cosmos' && (
						<Tabs
							defaultActiveKey='1'
							items={services}
							onChange={onChange}
							size='small'
							tabBarGutter={1}
							activeKey={activeTab}
							className='hide-tab-panel md:hidden'
							type='card'
						/>
					)}
					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
