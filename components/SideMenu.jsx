import { RightOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Image from 'next/image.js'
import Link from 'next/link.js'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import { getCelestiaMenuItems } from '@utils/sidebarMenu/getCelestiaMenu'
import { getItem } from '@utils/sidebarMenu/getItem'
import { getNamadaMenuItems } from '@utils/sidebarMenu/getNamadaMenu'
import projects from 'data/projects'
import { currentProject } from 'utils/currentProjectByURL'

let rootSubmenuKeys = [
	'services',
	'installation',
	'upgrade',
	'cheat-sheet',
	'public-rpc',
	'bridge-node',
	'light-node',
	'full-node'
]

const SideMenu = () => {
	const router = useRouter()
	const [openKeys, setOpenKeys] = useState([])
	const [selectedKeys, setSelectedKeys] = useState([])
	const { theme, toggleTheme } = useContext(Context)
	const [items, setItems] = useState([])
	const [value, setValue] = useState()
	const [resources, setResources] = useState()
	const curProject = useRef()
	const defValue = useRef()

	const handleClick = (event, targetId, key) => {
		const targetElement = document.getElementById(targetId)
		setSelectedKeys(key)

		if (targetElement) {
			event.preventDefault()
			targetElement.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const onOpenChange = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys)
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
		}
	}

	const generateLinkItem = (serviceURL, name, linkKey, displayName, basePath = '') => {
		const keyName = `${linkKey}${name}`
		const href = `${serviceURL}${basePath}/#${linkKey}`

		return getItem(
			<Link href={href} onClick={event => handleClick(event, linkKey, keyName)}>
				{displayName}
			</Link>,
			keyName,
			<RightOutlined />,
			null
		)
	}

	// const handleTabClick = value => {
	// 	setValue(value)
	// 	setSelectedKeys([])
	// 	const href = `/services/${value}/${curProject.current}`
	// 	router.push(href)
	// }

	const openKeysByURL = URL => {
		if (URL.indexOf('installation') > -1) setOpenKeys([`installation`])
		else if (URL.indexOf('upgrade') > -1) setOpenKeys([`upgrade`])
		else if (URL.indexOf('cheat') > -1) setOpenKeys([`cheat-sheet`])
		else if (URL.indexOf('bridge-node') > -1) setOpenKeys([`bridge-node`])
		else if (URL.indexOf('full-node') > -1) setOpenKeys([`full-node`])
		else if (URL.indexOf('light-node') > -1) setOpenKeys([`light-node`])
		else setOpenKeys([`services`])
	}

	useEffect(() => {
		const { name, type, serviceURL } = currentProject()
		setValue(type)
		defValue.current = type
		curProject.current = name
		const imgURL = projects[type][name].imgUrl
		const ecosystem = projects[type][name].ecosystem
		const URL = window.location.href
		openKeysByURL(URL)

		const isParams = curProject.current === 'cardchain' ? true : false

		setResources(
			<div className='pt-[2px]'>
				<a
					href={projects[type][name].website}
					target='_blank'
					rel='noopener referrer'
					className='flex items-center p-1 text-xs lg:text-sm w-fit font-thin my-0 action rounded-2xl bg-gray-100 px-2 transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300 dark:bg-zinc-700  dark:text-slate-200 dark:hover:bg-zinc-600 dark:focus-visible:bg-zinc-600 dark:active:bg-zinc-500'
				>
					<Image
						className='my-1 mr-2 '
						src={require(`../public/${type}/${imgURL}`)}
						alt='project logo'
						width='19'
						height='19'
						style={{
							borderRadius: '50%',
							backgroundColor: '#fff'
						}}
					/>
					<span>Website</span>
				</a>
			</div>
		)

		if (name === 'namada') {
			setItems(getNamadaMenuItems(type, imgURL, serviceURL, name, handleClick))
		} else if (name === 'celestia') {
			setItems(getCelestiaMenuItems(type, imgURL, serviceURL, name, handleClick))
		} else {
			ecosystem === 'false'
				? setItems([
						getItem(
							<div className='flex flex-col gap-2 '>
								<div className='flex gap-2 md:gap-3 items-center mb-2'>
									{' '}
									<Image
										className='my-1 mx-1'
										src={require(`../public/${type}/${imgURL}`)}
										alt='project logo'
										width='35'
										height='35'
										style={{
											borderRadius: '50%',
											backgroundColor: '#fff'
										}}
									/>
									<span className='font-semibold tracking-wide'>
										{name.charAt(0).toUpperCase() + name.slice(1)}
									</span>
								</div>
							</div>,
							'grpthis',
							null,
							null,
							'group'
						),
						generateLinkItem(
							serviceURL,
							name,
							'installation',
							<div className='flex'>
								<Image className='mr-4' src='/icons/emoji/pin.svg' alt='telegram' width={18} height={18} />{' '}
								Installation
							</div>
						),
						generateLinkItem(
							serviceURL,
							name,
							'security',
							<div className='flex'>
								<Image
									className='mr-4'
									src='/icons/emoji/lock.svg'
									alt='telegram'
									width={18}
									height={18}
								/>{' '}
								Security
							</div>
						),
						generateLinkItem(
							serviceURL,
							name,
							'upgrade',
							<div className='flex'>
								<Image
									className='mr-4'
									src='/icons/emoji/update.svg'
									alt='update'
									width={18}
									height={18}
								/>{' '}
								Upgrade
							</div>
						),
						generateLinkItem(
							serviceURL,
							name,
							'delete',
							<div className='flex'>
								<Image className='mr-4' src='/icons/emoji/no.svg' alt='telegram' width={18} height={18} />{' '}
								Delete
							</div>
						),
						name === 'nym' &&
							generateLinkItem(
								'/nym-itrocket',
								name,
								'delegate',
								<span>
									<span className='mr-3'>💰</span> Delegate
								</span>,
								''
							),
						{
							type: 'divider'
						}
				  ])
				: setItems([
						getItem(
							<div className='flex flex-col gap-2 '>
								<div className='flex gap-2 md:gap-3 items-center mb-1'>
									<Image
										className='my-1 mx-1'
										src={require(`../public/${type}/${imgURL}`)}
										alt='project logo'
										width='35'
										height='35'
										style={{
											borderRadius: '50%',
											backgroundColor: '#fff'
										}}
									/>
									<span className='font-semibold tracking-wide'>
										{name.charAt(0).toUpperCase() + name.slice(1)}
									</span>
								</div>
								{/* <Segmented
								block
								defaultValue={defValue.current}
								value={value}
								options={[
									{
										label: 'mainnet',
										value: 'mainnet',
										disabled: projects['mainnet'][name] === undefined ? true : false
									},
									{
										label: 'testnet',
										value: 'testnet',
										disabled: projects['testnet'][name] === undefined ? true : false
									}
								]}
								onChange={handleTabClick}
							/> */}
							</div>,
							'grpthis',
							null,
							[
								getItem(
									<Link href={serviceURL}>
										<Image
											className='mr-4'
											src='/icons/emoji/settings.svg'
											alt='telegram'
											width={18}
											height={18}
										/>{' '}
										API & Sync
									</Link>,
									`services`,
									null,
									[
										generateLinkItem(serviceURL, name, 'rpc', 'RPC, API, GRPC'),
										generateLinkItem(serviceURL, name, 'peer', 'Peers, Seeds'),
										generateLinkItem(serviceURL, name, 'snap', 'Snapshot'),
										generateLinkItem(serviceURL, name, 'sync', 'State sync'),
										generateLinkItem(serviceURL, name, 'wasm', 'Wasm')
									]
								),

								getItem(
									<Link href={serviceURL + '/installation'}>
										<Image
											className='mr-4'
											src='/icons/emoji/pin.svg'
											alt='telegram'
											width={18}
											height={18}
										/>{' '}
										Installation
									</Link>,
									`installation`,
									null,
									[
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'installation',
											<span>Manual Installation</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'auto-installation',
											<span>Automatic Installation</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'create-wallet',
											<span>Create Wallet</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'create-validator',
											<span>Create Validator</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'monitoring',
											<span>Monitoring</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'security',
											<span>Security</span>
										),
										generateLinkItem(
											serviceURL + '/installation',
											name,
											'delete',
											<span>Delete node</span>
										)
									]
								),
								getItem(
									<Link href={serviceURL + '/upgrade'}>
										<Image
											className='mr-4'
											src='/icons/emoji/update.svg'
											alt='update'
											width={18}
											height={18}
										/>{' '}
										Upgrade
									</Link>,
									`upgrade`,
									null,
									[
										generateLinkItem(
											serviceURL + '/upgrade',
											name,
											'manual',
											<span>Manual upgrade</span>
										),
										generateLinkItem(serviceURL + '/upgrade', name, 'auto', <span>Auto upgrade</span>)
									]
								),
								getItem(
									<Link href={serviceURL + '/cheat-sheet'}>
										<Image
											className='mr-4'
											src='/icons/emoji/sheet.svg'
											alt='telegram'
											width={18}
											height={18}
										/>
										Cheat sheet
									</Link>,
									`cheat-sheet`,
									null,
									[
										generateLinkItem(
											serviceURL + '/cheat-sheet',
											name,
											'service-operations',
											<span>Service operations</span>
										),
										generateLinkItem(
											serviceURL + '/cheat-sheet',
											name,
											'key-management',
											<span>Key management</span>
										),
										generateLinkItem(serviceURL + '/cheat-sheet', name, 'tokens', <span>Tokens</span>),
										generateLinkItem(
											serviceURL + '/cheat-sheet',
											name,
											'validator-operations',
											<span>Validator operations</span>
										),
										generateLinkItem(
											serviceURL + '/cheat-sheet',
											name,
											'governance',
											<span>Governance</span>
										),
										generateLinkItem(serviceURL + '/cheat-sheet', name, 'utility', <span>Utility</span>)
									]
								)
							],
							'group'
						),
						getItem('', 'divider1', null, null, 'group'),
						{
							type: 'divider'
						},
						getItem(
							<div>
								<Link
									className='font-normal text-sm dark:text-[#a7a7a7] flex items-center gap-3 ml-3 mt-1'
									href={serviceURL + '/public-rpc'}
								>
									<Image
										className=''
										src='/icons/emoji/globe.svg'
										alt='telegram'
										width={18}
										height={18}
									/>{' '}
									Public RPC Scanner
								</Link>
							</div>,
							'public rpc',
							null,
							null,
							'group'
						),
						isParams
							? getItem(
									<div>
										<Link
											className='font-normal text-sm dark:text-[#a7a7a7]'
											href={serviceURL + '/params'}
										>
											<span className='mr-2 ml-3'> ⚒</span> Parameters
										</Link>
									</div>,
									'parameters',
									null,
									null,
									'group'
							  )
							: null,
						getItem(
							<div className='mb-2'>
								<a
									className='font-normal text-sm dark:text-[#a7a7a7] flex items-center ml-3 mt-1'
									href={`https://t.me/itrocket_${type}_proposal_bot`}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										className='mr-3'
										src='/icons/emoji/bot.svg'
										alt='telegram'
										width={18}
										height={18}
									/>{' '}
									Proposal bot
								</a>
							</div>,
							'public rpc',
							null,
							null,
							'group'
						)
				  ])
		}
	}, [router])

	return (
		<aside
			className={styles.sideColumn}
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#19191A'
			}}
		>
			<div className={styles.sideColumn__wrapper}>
				<Menu
					items={items}
					style={{
						width: '100%',
						backgroundColor: theme === 'light' ? '#fff' : '#19191A'
					}}
					mode='inline'
					theme={theme}
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					onOpenChange={onOpenChange}
				/>
				<div className='pl-1 pt-1'>
					<span className='mb-2 pt-1 block text-[13px] text-gray-400 dark:text-zinc-500'>
						Official Resources
					</span>
					{resources}{' '}
				</div>
			</div>
		</aside>
	)
}

export default SideMenu
