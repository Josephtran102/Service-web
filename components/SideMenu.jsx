import { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import { Menu, Segmented } from 'antd'
import Link from 'next/link.js'
import Image from 'next/image.js'
import { RightOutlined } from '@ant-design/icons'
import { currentProject } from 'utils/currentProjectByURL'
import { useRouter } from 'next/navigation'
import { changeStyles } from '@utils/changeStyles'

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type
	}
}

const SideMenu = () => {
	const router = useRouter()
	const [openKeys, setOpenKeys] = useState([])
	const [selectedKeys, setSelectedKeys] = useState([])
	const { theme, toggleTheme } = useContext(Context)
	const [items, setItems] = useState([])
	const [value, setValue] = useState()
	let rootSubmenuKeys = ['services', 'installation', 'upgrade', 'cheat-sheet']
	const curProject = useRef()
	const defValue = useRef()

	const onOpenChange = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys)
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
		}
	}

	const handleClick = (event, targetId, key) => {
		const targetElement = document.getElementById(targetId)
		setSelectedKeys(key)

		if (targetElement) {
			event.preventDefault()
			targetElement.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleTabClick = value => {
		setValue(value)
		setSelectedKeys([])
		const href = `/services/${value}/${curProject.current}`
		router.push(href)
	}

	useEffect(() => {
		const { name, type, serviceURL } = currentProject()
		setValue(type)
		defValue.current = type
		curProject.current = name
		const imgURL = projects[type][name].imgUrl
		const ecosystem = projects[type][name].ecosystem
		const URL = window.location.href
		if (URL.indexOf('installation') > -1) setOpenKeys([`installation`])
		else if (URL.indexOf('upgrade') > -1) setOpenKeys([`upgrade`])
		else if (URL.indexOf('cheat') > -1) setOpenKeys([`cheat-sheet`])
		else setOpenKeys([`services`])

		ecosystem === 'false'
			? setItems([
					getItem(
						<div className='flex flex-col gap-2 '>
							<div className='flex gap-2 md:gap-3 items-center mb-1'>
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
					{
						type: 'divider'
					},
					getItem(
						<span class='mb-2 block text-gray-400 dark:text-zinc-500'>Official Resources</span>,
						'website',
						null,
						null
					),
					getItem(
						<a
							href={projects[type][name].website}
							target='_blank'
							rel='noopener referrer'
							className='flex items-center w-fit my-0 action rounded-2xl bg-gray-100 px-2 transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300 dark:bg-zinc-700  dark:text-white dark:hover:bg-zinc-600 dark:focus-visible:bg-zinc-600 dark:active:bg-zinc-500'
						>
							<Image
								className='my-1 mr-2'
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
						</a>,
						'websitepc',
						null
					)
			  ])
			: setItems([
					getItem(
						<div className='flex flex-col gap-2 '>
							<div className='flex gap-2 md:gap-3 items-center mb-1'>
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
							<Segmented
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
								style={{
									backgroundColor: theme === 'dark' ? '#6b6969' : '#efefef'
								}}
							/>
						</div>,
						'grpthis',
						null,
						[
							getItem(<Link href={serviceURL}>⚙️ API & Sync</Link>, `services`, null, [
								getItem(
									<Link
										href={serviceURL + '#rpc'}
										onClick={event => handleClick(event, 'rpc', `rpc${name}`)}
									>
										RPC, API, GRPC
									</Link>,
									`rpc${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '#peer'}
										onClick={event => handleClick(event, 'peer', `peer${name}`)}
									>
										Peers, Seeds
									</Link>,
									`peer${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '#snap'}
										onClick={event => handleClick(event, 'snap', `snap${name}`)}
									>
										Snapshot
									</Link>,
									`snap${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '#sync'}
										onClick={event => handleClick(event, 'sync', `state${name}`)}
									>
										State sync
									</Link>,
									`state${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '#wasm'}
										onClick={event => handleClick(event, 'wasm', `wasm${name}`)}
									>
										Wasm
									</Link>,
									`wasm${name}`,
									<RightOutlined />
								)
							]),

							getItem(
								<Link href={serviceURL + '/installation'}>📌 Installation</Link>,
								`installation`,
								null,
								[
									getItem(
										<Link
											href={serviceURL + '/installation/#installation'}
											onClick={event => handleClick(event, 'installation', `install${name}`)}
										>
											Installation
										</Link>,
										`install${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/installation/#create-wallet'}
											onClick={event => handleClick(event, 'create-wallet', `wallet${name}`)}
										>
											Create Wallet
										</Link>,
										`wallet${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/installation/#create-validator'}
											onClick={event => handleClick(event, 'create-validator', `validator${name}`)}
										>
											Create Validator
										</Link>,
										`validator${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/installation/#monitoring'}
											onClick={event => handleClick(event, 'monitoring', `Monitoring${name}`)}
										>
											Monitoring
										</Link>,
										`Monitoring${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/installation/#security'}
											onClick={event => handleClick(event, 'security', `security${name}`)}
										>
											Security
										</Link>,
										`security${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/installation/#delete'}
											onClick={event => handleClick(event, 'delete', `Delete${name}`)}
										>
											Delete node
										</Link>,
										`Delete${name}`,
										<RightOutlined />
									)
								]
							),
							getItem(<Link href={serviceURL + '/upgrade'}>🔄 Upgrade</Link>, `upgrade`, null, [
								getItem(
									<Link
										href={serviceURL + '/upgrade/#manual'}
										onClick={event => handleClick(event, 'manual', `manual${name}`)}
									>
										Manual upgrade
									</Link>,
									`manual${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '/upgrade/#auto'}
										onClick={event => handleClick(event, 'auto', `auto${name}`)}
									>
										Auto upgrade
									</Link>,
									`auto${name}`,
									<RightOutlined />
								)
							]),
							getItem(
								<Link href={serviceURL + '/cheat-sheet'}>📝 Cheat sheet</Link>,
								`cheat-sheet`,
								null,
								[
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#service-operations'}
											onClick={event =>
												handleClick(event, 'service-operations', `service-operations${name}`)
											}
										>
											Service operations
										</Link>,
										`service-operations${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#key-management'}
											onClick={event =>
												handleClick(event, 'key-management', `key-management${name}`)
											}
										>
											Key management
										</Link>,
										`key-management${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#tokens'}
											onClick={event => handleClick(event, 'tokens', `tokens${name}`)}
										>
											Tokens
										</Link>,
										`tokens${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#validator-operations'}
											onClick={event =>
												handleClick(event, 'validator-operations', `validator-operations${name}`)
											}
										>
											Validator operations
										</Link>,
										`validator-operations${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#governance'}
											onClick={event => handleClick(event, 'governance', `governance${name}`)}
										>
											Governance
										</Link>,
										`governance${name}`,
										<RightOutlined />
									),
									getItem(
										<Link
											href={serviceURL + '/cheat-sheet/#utility'}
											onClick={event => handleClick(event, 'utility', `utility${name}`)}
										>
											Utility
										</Link>,
										`utility${name}`,
										<RightOutlined />
									)
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
						<span class='mb-2 block text-gray-400 dark:text-zinc-500'>Official Resources</span>,
						'website',
						null,
						null
					),
					getItem(
						<a
							href={projects[type][name].website}
							target='_blank'
							rel='noopener referrer'
							className='flex items-center w-fit my-0 action rounded-2xl bg-gray-100 px-2 transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300 dark:bg-zinc-700  dark:text-white dark:hover:bg-zinc-600 dark:focus-visible:bg-zinc-600 dark:active:bg-zinc-500'
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
						</a>,
						'websitepc',
						null
					)
			  ])
	}, [router])

	return (
		<aside
			className={styles.sideColumn}
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a'
			}}
		>
			<Menu
				items={items}
				style={{
					width: '100%',
					backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a'
				}}
				mode='inline'
				theme={theme}
				openKeys={openKeys}
				selectedKeys={selectedKeys}
				onOpenChange={onOpenChange}
			/>
		</aside>
	)
}

export default SideMenu
