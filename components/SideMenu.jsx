import { useContext, useEffect, useState } from 'react'
import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { Menu } from 'antd'
import Link from 'next/link.js'
import Image from 'next/image.js'
import { RightOutlined } from '@ant-design/icons'
import { currentProject } from 'utils/currentProjectByURL'
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { submitPFB } from '@utils/pfb'

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	}
}

const SideMenu = ({ intervalId }) => {
	const router = useRouter()
	const [openKeys, setOpenKeys] = useState([])
	const [selectedKeys, setSelectedKeys] = useState([])
	const { theme, toggleTheme } = useContext(Context)
	const [items, setItems] = useState([])
	let rootSubmenuKeys = ['services', 'installation', 'upgrade', 'cheat-sheet']

	const data = [
		{
			label: 'mainnet',
			value: 'mainnet',
			href: '/services/mainnet/',
		},
		{
			label: 'testnet',
			value: 'testnet',
			href: '/services/testnet/',
		},
	]

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

	const fillSideMenu = type => {
		const data = projects[type]

		return Object.entries(data).map(([item, { name = item, imgUrl }]) => {
			const id = type + name
			const serviceURL = `/services/${type}/${name.toLowerCase()}`
			// projects[type][item].minGasPrice = '0'
			// console.log(projects)

			return getItem(
				<a href={serviceURL} rel='noopener referrer'>
					{name.charAt(0).toUpperCase() + name.slice(1)}
				</a>,
				`grp${id}`,
				<Image
					src={`/${type}/${imgUrl}`}
					style={{ borderRadius: '50%' }}
					alt='project logo'
					width='20'
					height='20'
					unoptimized
				/>
			)
		})
	}

	const handleTabClick = href => {
		setSelectedKeys([])
		router.push(href)
	}

	useEffect(() => {
		const { name, type, serviceURL } = currentProject()
		const reversedType = type === 'testnet' ? 'mainnet' : 'testnet'
		const mainnet = fillSideMenu('mainnet')
		const testnet = fillSideMenu('testnet')
		const imgURL = projects[type][name].imgUrl
		const URL = window.location.href
		if (URL.indexOf('installation') > -1) setOpenKeys([`installation`])
		else if (URL.indexOf('upgrade') > -1) setOpenKeys([`upgrade`])
		else if (URL.indexOf('cheat') > -1) setOpenKeys([`cheat-sheet`])
		else setOpenKeys([`services`])

		setItems([
			getItem(
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2 items-center'>
						{' '}
						<Image
							src={require(`../public/${type}/${imgURL}`)}
							alt='project logo'
							width='25'
							height='25'
							unoptimized
							style={{
								borderRadius: '50%',
								backgroundColor: '#fff',
								marginLeft: '2px',
							}}
						/>
						<span className='font-bold'>
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</span>
					</div>
					{projects[type][name] !== undefined &&
						projects[reversedType][name] !== undefined && (
							<Tabs value={type}>
								<TabsHeader>
									{data.map(({ label, href, value }) => (
										<Tab
											key={label}
											value={value}
											onClick={() => handleTabClick(`${href}${name}`)}
											style={{ margin: '3px' }}
										>
											{label}
										</Tab>
									))}
								</TabsHeader>
							</Tabs>
						)}
				</div>,
				'grpthis',
				null,
				[
					getItem('⚙️ Services', `services`, null, [
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
						),
					]),

					getItem('📌 Installation', `installation`, null, [
						getItem(
							<Link
								href={serviceURL + '/installation/#installation'}
								onClick={event =>
									handleClick(event, 'installation', `install${name}`)
								}
							>
								Installation
							</Link>,
							`install${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#create-wallet'}
								onClick={event =>
									handleClick(event, 'create-wallet', `wallet${name}`)
								}
							>
								Create Wallet
							</Link>,
							`wallet${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#create-validator'}
								onClick={event =>
									handleClick(event, 'create-validator', `validator${name}`)
								}
							>
								Create Validator
							</Link>,
							`validator${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#monitoring'}
								onClick={event =>
									handleClick(event, 'monitoring', `Monitoring${name}`)
								}
							>
								Monitoring
							</Link>,
							`Monitoring${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#security'}
								onClick={event =>
									handleClick(event, 'security', `security${name}`)
								}
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
						),
					]),
					getItem('🔄 Upgrade', `upgrade`, null, [
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
								Autoupgrade
							</Link>,
							`auto${name}`,
							<RightOutlined />
						),
					]),
					getItem('📝 Cheat sheet', `cheat-sheet`, null, [
						getItem(
							<Link
								href={serviceURL + '/cheat-sheet/#service-operations'}
								onClick={event =>
									handleClick(
										event,
										'service-operations',
										`service-operations${name}`
									)
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
									handleClick(
										event,
										'validator-operations',
										`validator-operations${name}`
									)
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
								onClick={event =>
									handleClick(event, 'governance', `governance${name}`)
								}
							>
								Governance
							</Link>,
							`governance${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/cheat-sheet/#utility'}
								onClick={event =>
									handleClick(event, 'utility', `utility${name}`)
								}
							>
								Utility
							</Link>,
							`utility${name}`,
							<RightOutlined />
						),
					]),
				],
				'group'
			),
			getItem('', 'divider1', null, null, 'group'),
			{
				type: 'divider',
			},

			getItem(
				<p className='flex items-center gap-5 my-0'>
					<Image
						src={require('../public/icons/website.png')}
						alt='item'
						style={{ borderRadius: '50%' }}
						unoptimized
						width='20'
						height='20'
					/>
					<span>
						<a
							className='flex items-center gap-2'
							href={projects[type][name].website}
							target='_blank'
							rel='noopener referrer'
						>
							Website
						</a>
					</span>
				</p>,
				'website',
				null
			),
			{
				type: 'divider',
			},
			getItem('', 'divider2', null, null, 'group'),

			// getItem(
			// 	'All projects',
			// 	`grphide${name}`,
			// 	<Image
			// 		src={require('../public/justRocketCrop.png')}
			// 		alt='logo'
			// 		width='25'
			// 		height='25'
			// 		unoptimized={true}
			// 		style={{ backgroundColor: 'transparent' }}
			// 	/>,
			// 	null,
			// 	'group'
			// ),
			getItem('Mainnet', 'grpmain', null, null, 'group'),
			...mainnet,
			getItem('Testnet', 'grptest', null, null, 'group'),
			...testnet,
			getItem('', 'marginfix', null, null, 'group'),
			getItem('', 'marginfix1', null, null, 'group'),
			getItem('', 'marginfix2', null, null, 'group'),
		])
	}, [router])

	return (
		<aside
			className={styles.sideColumn}
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
				boxShadow: 'rgba(140, 140, 140, 0.18) 0px 6px 26px 0px',
			}}
		>
			<Menu
				items={items}
				style={{
					width: '100%',
					borderInlineEnd: '1px solid rgba(140, 140, 140, 0.2)',
					backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
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
