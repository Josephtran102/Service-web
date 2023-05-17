import { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import SideMenu from '@components/SideMenu'
import { fetchStatus } from 'utils/fetchProject.js'
import styles from '@styles/Services.module.scss'
import { currentProject } from 'utils/currentProjectByURL'
import projects from '@store/projects'
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
	const [blockHeight, setBlockHeight] = useState(null)
	const [chainID, setChainID] = useState()
	const [explorer, setExplorer] = useState(null)
	const [value, setValue] = useState()
	const [intervalId, setIntervalId] = useState(null)
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

	const changeModalStyles = () => {
		const modal = document.getElementsByClassName('ant-modal-content')[0]
		const closeIcon = document.getElementsByClassName('ant-modal-close-icon')[0]

		if (theme === 'dark' && modal) {
			modal.style.backgroundColor = '#222'
			modal.style.color = '#fff'
		} else if (modal) {
			modal.style.backgroundColor = '#fff'
			modal.style.color = '#000'
		}

		if (theme === 'dark' && closeIcon) {
			closeIcon.style.color = '#fff'
		} else if (modal && closeIcon) {
			closeIcon.style.color = '#000'
		}
	}

	useEffect(() => {
		changeModalStyles()
	}, [theme])

	useEffect(() => {
		let isCurrent = true
		const project = currentProject()
		const name = project.name
		const type = project.type
		curProjectName.current = name
		curProjectType.current = type

		if (isCurrent) {
			setName(project.name)
			setExplorer(project.explorer)
			setChainID(project?.chainID)
		}

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
		changeModalStyles()

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
					minWidth: '70%',
				}}
			>
				<div
					className={styles.mainColumn}
					style={{ border: '0px', boxShadow: 'none' }}
				>
					<h2 id='mainnets' style={{ marginTop: '0', paddingTop: '5px' }}>
						Mainnets
					</h2>
					<div className={styles.mainnetColumn}>
						{Object.keys(mainnetData).map(item => {
							const name =
								mainnetData[item].name ||
								item.charAt(0).toUpperCase() + item.slice(1)
							const serviceURL = '/services/mainnet/' + name.toLowerCase()
							const isCurrent =
								currentProject().name === name.toLowerCase() &&
								currentProject().type == 'mainnet'
									? true
									: false

							return (
								!isCurrent && (
									<a
										href={serviceURL}
										className={styles.chain__wrapper}
										onClick={handleLinkClick}
										key={name}
									>
										<Image
											src={require('@public/mainnet/'.concat(
												mainnetData[item].imgUrl
											))}
											alt='project logo'
											width='25'
											height='25'
										/>
										{name}
									</a>
								)
							)
						})}
					</div>
					<br />
					<h2 style={{ marginTop: '0', paddingTop: '5px' }} id='testnets'>
						Testnets
					</h2>
					<div className={styles.testnetColumn}>
						{Object.keys(testnetData).map(item => {
							const name =
								testnetData[item].name ||
								item.charAt(0).toUpperCase() + item.slice(1)
							const serviceURL = '/services/testnet/' + name.toLowerCase()
							const isCurrent =
								currentProject().name === name.toLowerCase() &&
								currentProject().type == 'testnet'
									? true
									: false

							return (
								!isCurrent && (
									<Link
										href={serviceURL}
										className={styles.chain__wrapper}
										onClick={handleLinkClick}
										key={name}
									>
										<Image
											src={require('@public/testnet/'.concat(
												testnetData[item].imgUrl
											))}
											alt='project logo'
											width='25'
											height='25'
										/>
										{name}
									</Link>
								)
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
								<span className='flex items-center gap-2 select-none'>
									<RetweetOutlined />
									<b className={styles.bold}>
										{name.charAt(0).toUpperCase() + name.slice(1)}
									</b>
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
						</div>
					</div>
					<Segmented
						value={value}
						defaultValue={curProjectType.current}
						options={['services', 'installation', 'upgrade', 'cheat-sheet']}
						onChange={handleTabClick}
						style={{
							marginBottom: '10px',
							marginLeft: '5px',
							backgroundColor: theme === 'dark' ? '#6b6969' : '#e0e0e0',
							width: 'fit-content',
						}}
						className={styles.mobileSegmented}
					/>
					{props.children}
				</main>
			</div>
			<Footer />
		</div>
	)
}
