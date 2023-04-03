import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@context/context'
import styles from '@styles/Services.module.scss'
import projects from '@store/projects'
import { Menu } from 'antd'
import Link from 'next/link.js'
import Image from 'next/image.js'
import { RightOutlined } from '@ant-design/icons'
import { currentProject } from 'utils/currentProjectByURL'
import { useRouter } from 'next/router'

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	}
}

const SideMenu = () => {
	const router = useRouter()
	const [openKeys, setOpenKeys] = useState([])
	const { theme, toggleTheme } = useContext(Context)
	const mainnetData = projects.mainnet
	const testnetData = projects.testnet
	const [items, setItems] = useState([])
	let rootSubmenuKeys = ['services', 'installation', 'upgrade']

	function smoothScrollTo(targetElement, e) {
		targetElement.scrollIntoView({ behavior: 'smooth' })

		router.push(e.target.href)
	}

	const handleClick = (event, targetId) => {
		const targetElement = document.getElementById(targetId)

		if (targetElement) {
			event.preventDefault()
			smoothScrollTo(targetElement, event)
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

	const fillSideMenu = type => {
		const data = type == 'mainnet' ? mainnetData : testnetData
		const allMarkup = []

		Object.keys(data).forEach(item => {
			const name = data[item].name || item
			const id = type + name
			const serviceURL = `/services/${type}/` + name.toLowerCase()
			const imgURL = data[item].imgUrl

			allMarkup.push(
				getItem(
					<a href={serviceURL} rel='noopener referrer'>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</a>,

					`grp${id}`,
					<Image
						src={require(`../public/${type}/${imgURL}`)}
						alt='project logo'
						width='20'
						height='20'
						unoptimized={true}
					/>
				)
			)
		})
		return allMarkup
	}

	const installRef = useRef()

	useEffect(() => {
		const project = currentProject()
		const name = project.name
		const type = project.type
		const serviceURL = project.serviceURL
		const mainnet = fillSideMenu('mainnet')
		const testnet = fillSideMenu('testnet')
		const imgURL = projects[type][name].imgUrl
		setOpenKeys([`services`])

		setItems([
			getItem(
				<div className='flex gap-2 items-center'>
					<Image
						src={require(`../public/${type}/${imgURL}`)}
						alt='project logo'
						width='25'
						height='25'
						unoptimized={true}
						style={{
							borderRadius: '50%',
							backgroundColor: '#fff',
							marginLeft: '2px',
						}}
					/>
					{name.charAt(0).toUpperCase() + name.slice(1)}
				</div>,
				'grpthis',
				null,
				[
					getItem('Services', `services`, null, [
						getItem(
							<Link
								href={serviceURL + '#rpc'}
								onClick={event => handleClick(event, 'rpc')}
							>
								RPC, API, GRPC
							</Link>,
							`rpc${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '#peer'}
								onClick={event => handleClick(event, 'peer')}
							>
								Peers, Seeds
							</Link>,
							`peer${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '#snap'}
								onClick={event => handleClick(event, 'snap')}
							>
								Snapshot
							</Link>,
							`snap${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '#sync'}
								onClick={event => handleClick(event, 'sync')}
							>
								State sync
							</Link>,
							`state${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '#wasm'}
								onClick={event => handleClick(event, 'wasm')}
							>
								Wasm
							</Link>,
							`wasm${name}`,
							<RightOutlined />
						),
					]),

					getItem('Installation', `installation`, null, [
						getItem(
							<Link
								href={serviceURL + '/installation/#installation'}
								onClick={event => handleClick(event, 'installation')}
							>
								Installation
							</Link>,
							`install${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#wallet'}
								onClick={event => handleClick(event, 'wallet')}
							>
								Wallet
							</Link>,
							`wallet${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#validator'}
								onClick={event => handleClick(event, 'validator')}
							>
								Validator
							</Link>,
							`validator${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#monitoring'}
								onClick={event => handleClick(event, 'monitoring')}
							>
								Monitoring
							</Link>,
							`Monitoring${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#security'}
								onClick={event => handleClick(event, 'security')}
							>
								Security
							</Link>,
							`security${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/installation/#delete'}
								onClick={event => handleClick(event, 'delete')}
							>
								Delete node
							</Link>,
							`Delete${name}`,
							<RightOutlined />
						),
					]),
					getItem('Upgrade', `upgrade`, null, [
						getItem(
							<Link
								href={serviceURL + '/upgrade/#manual'}
								onClick={event => handleClick(event, 'manual')}
							>
								Manual upgrade
							</Link>,
							`manual${name}`,
							<RightOutlined />
						),
						getItem(
							<Link
								href={serviceURL + '/upgrade/#auto'}
								onClick={event => handleClick(event, 'auto')}
							>
								Autoupgrade
							</Link>,
							`auto${name}`,
							<RightOutlined />
						),
					]),
				],
				'group'
			),
			getItem('', 'divider', null, null, 'group'),
			{
				type: 'divider',
			},

			getItem(
				<p className='flex items-center gap-5 my-0'>
					<Image
						src={require('../public/icons/website.png')}
						alt='item'
						style={{ borderRadius: '50%' }}
						unoptimized={true}
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

			getItem('', 'divider', null, null, 'group'),
			{
				type: 'divider',
			},

			getItem(
				'All projects',
				`grphide${name}`,
				<Image
					src={require('../public/justRocketCrop.png')}
					alt='logo'
					width='25'
					height='25'
					unoptimized={true}
					style={{ backgroundColor: 'transparent' }}
				/>,
				[
					getItem('Mainnet', 'grpmain', null, null, 'group'),
					...mainnet,
					getItem('Testnet', 'grptest', null, null, 'group'),
					...testnet,
					getItem('', 'marginfix', null, null, 'group'),
					getItem('', 'marginfix1', null, null, 'group'),
				]
			),
		])
	}, [])

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
					transition: '0.1s',
					backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
				}}
				mode='inline'
				theme={theme}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
			/>
		</aside>
	)
}

export default SideMenu
