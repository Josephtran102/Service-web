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
import { Modal, Segmented } from 'antd'
import Link from 'next/link'
import Image from 'next/image'

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
	const [isModalOpen, setIsModalOpen] = useState(false)
	const mainnetData = projects.mainnet
	const testnetData = projects.testnet

	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

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

	const handleLinkClick = e => {
		e.preventDefault()
		setIsModalOpen(false)
		window.location.replace(e.currentTarget.href)
	}

	return (
		<div style={{ opacity: opacity }}>
			<Modal
				centered
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{ style: { display: 'none' } }}
				cancelButtonProps={{ style: { display: 'none' } }}
				style={{
					minWidth: '70%'
				}}
			>
				<div className={styles.mainColumn} style={{ border: '0px', boxShadow: 'none' }}>
					<h2 id='mainnets' style={{ marginTop: '0', paddingTop: '5px' }}>
						Mainnets
					</h2>
					<div className={styles.mainnetColumn}>
						{Object.keys(mainnetData).map(item => {
							const name = mainnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
							const serviceURL = '/services/mainnet/' + name.toLowerCase()
							const isCurrent =
								currentProject().name === name.toLowerCase() && currentProject().type == 'mainnet'
									? true
									: false

							return (
								<Link
									href={serviceURL}
									className={styles.chain__wrapper}
									onClick={handleLinkClick}
									key={name}
								>
									<Image
										src={require('@public/mainnet/'.concat(mainnetData[item].imgUrl))}
										alt='project logo'
										width='25'
										height='25'
									/>
									{name}
								</Link>
							)
						})}
					</div>
					<br />
					<h2 style={{ marginTop: '0', paddingTop: '5px' }} id='testnets'>
						Testnets
					</h2>
					<div className={styles.testnetColumn}>
						{Object.keys(testnetData).map(item => {
							const name = testnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
							const serviceURL = '/services/testnet/' + name.toLowerCase()
							const isCurrent =
								currentProject().name === name.toLowerCase() && currentProject().type == 'testnet'
									? true
									: false

							return (
								<Link
									href={serviceURL}
									className={styles.chain__wrapper}
									onClick={handleLinkClick}
									key={name}
								>
									<Image
										src={require('@public/testnet/'.concat(testnetData[item].imgUrl))}
										alt='project logo'
										width='25'
										height='25'
									/>
									{name}
								</Link>
							)
						})}
					</div>
				</div>
			</Modal>
			<Header />

			<div className={styles.container}>
				<SideMenu intervalId={intervalId} />
				<main className={styles.mainColumn__wrapper}>
					<div
						className={styles.projectInfoCard}
						style={{ backgroundColor: theme === 'light' ? '#fff' : '#171717' }}
					>
						<div className={styles.stats}>
							<div className={styles.chain__wrapper} onClick={showModal}>
								<span className='flex items-center gap-4 select-none'>
									<b className={styles.bold}>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
									<RetweetOutlined />
								</span>
							</div>

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
