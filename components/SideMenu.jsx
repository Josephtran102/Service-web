import { useContext, useEffect, useState, useRef } from 'react'
import { Menu } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import Link from 'next/link.js'
import Image from 'next/image.js'
import { useRouter } from 'next/navigation'

import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import { currentProject } from 'utils/currentProjectByURL'

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
	const [resources, setResources] = useState()
	let rootSubmenuKeys = ['services', 'installation', 'upgrade', 'cheat-sheet', 'public-rpc']
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

	const generateLinkItem = (serviceURL, name, linkKey, displayName) => {
		const keyName = `${linkKey}${name}`
		const href = `${serviceURL}/cheat-sheet/#${linkKey}`

		return getItem(
			<Link href={href} onClick={event => handleClick(event, linkKey, keyName)}>
				{displayName}
			</Link>,
			keyName,
			<RightOutlined />
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

		function getNamadaMenuItems() {
			return [
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
					</div>,
					'grpthis',
					null,
					[
						getItem(
							<Link href={serviceURL}>
								<span className='mr-3'>⚙️</span> API & Sync
							</Link>,
							`services`,
							null,
							[
								getItem(
									<Link
										href={serviceURL + '#rpc'}
										onClick={event => handleClick(event, 'rpc', `rpc${name}`)}
									>
										RPC, Peers, Seeds
									</Link>,
									`rpc${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '#addrbook'}
										onClick={event => handleClick(event, 'addrbook', `addrbook${name}`)}
									>
										Addrbook, Genesis
									</Link>,
									`addrbook${name}`,
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
								)
							]
						),

						getItem(
							<Link href={serviceURL + '/installation'}>
								<span className='mr-3'>📌</span> Installation
							</Link>,
							`installation`,
							null,
							[
								getItem(
									<Link
										href={serviceURL + '/installation/#installation'}
										onClick={event => handleClick(event, 'installation', `install${name}`)}
									>
										Manual Installation
									</Link>,
									`install${name}`,
									<RightOutlined />
								),
								getItem(
									<Link
										href={serviceURL + '/installation/#auto-installation'}
										onClick={event =>
											handleClick(event, 'auto-installation', `auto-installation${name}`)
										}
									>
										Auto Installation
									</Link>,
									`install${name}`,
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
						getItem(
							<Link href={serviceURL + '/upgrade'}>
								<span className='mr-3'>🔄</span> Upgrade
							</Link>,
							`upgrade`,
							null,
							[
								getItem(
									<Link
										href={serviceURL + '/upgrade/#manual'}
										onClick={event => handleClick(event, 'manual', `manual${name}`)}
									>
										Manual upgrade
									</Link>,
									`manual${name}`,
									<RightOutlined />
								)
							]
						),
						getItem(
							<Link href={serviceURL + '/cheat-sheet'}>
								<span className='mr-3'>📝</span> Cheat sheet
							</Link>,
							`cheat-sheet`,
							null,
							[
								generateLinkItem(serviceURL, name, 'wallet-operations', 'Wallet operations'),
								generateLinkItem(serviceURL, name, 'multisign', 'Multisign'),
								generateLinkItem(serviceURL, name, 'masp', 'Masp'),
								generateLinkItem(serviceURL, name, 'validator-operations', 'Validator Operations'),
								generateLinkItem(serviceURL, name, 'sync-and-consensus', 'Sync and Consensus')
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
						<Link className='font-normal text-sm dark:text-[#a7a7a7]' href={serviceURL + '/public-rpc'}>
							<span className='mr-2 ml-3'> 🌐</span> Public RPC Scanner
						</Link>
					</div>,
					'public rpc',
					null,
					null,
					'group'
				),
				getItem(
					<div className='mb-2'>
						<Link className='font-normal text-sm dark:text-[#a7a7a7]' href={serviceURL + '/monitoring'}>
							<span className='mr-2 ml-3'> 🤖</span> Monitoring script
						</Link>
					</div>,
					'public rpc',
					null,
					null,
					'group'
				)
			]
		}

		if (name === 'namada') {
			setItems(getNamadaMenuItems())
		} else {
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
						getItem(
							<Link
								href={serviceURL + '#installation'}
								onClick={event => handleClick(event, 'installation', `installation`)}
							>
								<span className='mr-3'>📌</span> Installation
							</Link>,
							`installation`
						),
						getItem(
							<Link
								href={serviceURL + '#security'}
								onClick={event => handleClick(event, 'security', `security`)}
							>
								<span className='mr-3'>🔒</span> Security
							</Link>,
							`security`
						),
						getItem(
							<Link
								href={serviceURL + '#upgrade'}
								onClick={event => handleClick(event, 'upgrade', `upgrade`)}
							>
								<span className='mr-3'>🔄</span> Upgrade
							</Link>,
							`upgrade`
						),
						getItem(
							<Link href={serviceURL + '#delete'} onClick={event => handleClick(event, 'delete', `delete`)}>
								<span className='mr-3'>❌</span> Delete
							</Link>,
							`delete`
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
										<span className='mr-3'>⚙️</span> API & Sync
									</Link>,
									`services`,
									null,
									[
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
									]
								),

								getItem(
									<Link href={serviceURL + '/installation'}>
										<span className='mr-3'>📌</span> Installation
									</Link>,
									`installation`,
									null,
									[
										getItem(
											<Link
												href={serviceURL + '/installation/#installation'}
												onClick={event => handleClick(event, 'installation', `install${name}`)}
											>
												Manual Installation
											</Link>,
											`install${name}`,
											<RightOutlined />
										),
										getItem(
											<Link
												href={serviceURL + '/installation/#auto-installation'}
												onClick={event =>
													handleClick(event, 'auto-installation', `auto-install${name}`)
												}
											>
												Automatic Installation
											</Link>,
											`auto-install${name}`,
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
								getItem(
									<Link href={serviceURL + '/upgrade'}>
										<span className='mr-3'>🔄</span> Upgrade
									</Link>,
									`upgrade`,
									null,
									[
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
									]
								),
								getItem(
									<Link href={serviceURL + '/cheat-sheet'}>
										<span className='mr-3'>📝</span> Cheat sheet
									</Link>,
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
							<div>
								<Link
									className='font-normal text-sm dark:text-[#a7a7a7]'
									href={serviceURL + '/public-rpc'}
								>
									<span className='mr-2 ml-3'> 🌐</span> Public RPC Scanner
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
									className='font-normal text-sm dark:text-[#a7a7a7]'
									href={`https://t.me/itrocket_${type}_proposal_bot`}
									target='_blank'
									rel='noopener noreferrer'
								>
									<span className='mr-2 ml-3'> 🤖</span> Proposal bot
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
				backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a'
			}}
		>
			<div className={styles.sideColumn__wrapper}>
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
