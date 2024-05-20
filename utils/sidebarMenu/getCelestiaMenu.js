import { RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { getItem } from './getItem'

const generateLinkItem = (serviceURL, name, linkKey, displayName, handleClick, basePath = '') => {
	const keyName = `${linkKey}${name}`
	const href = `${serviceURL}${basePath}/${linkKey ? '#' + linkKey : ''}`

	return getItem(
		<Link href={href} onClick={event => handleClick(event, linkKey, keyName)}>
			{displayName}
		</Link>,
		keyName,
		<RightOutlined />,
		null
	)
}

export const getCelestiaMenuItems = (type, imgURL, serviceURL, name, handleClick) => {
	return [
		getItem(
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 md:gap-3 items-center mb-1'>
					<Image
						className='my-1 mx-1'
						src={require(`../../public/${type}/${imgURL}`)}
						alt='project logo'
						width='35'
						height='35'
						style={{
							borderRadius: '50%',
							backgroundColor: '#fff'
						}}
					/>
					<span className='font-semibold tracking-wide'>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
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
					<RightOutlined />,
					[
						generateLinkItem(serviceURL, name, 'rpc', 'RPC, API, GRPC', handleClick, ''),
						generateLinkItem(serviceURL, name, 'peer', 'Peers, Seeds', handleClick, ''),
						generateLinkItem(serviceURL, name, 'snap', 'Snapshot', handleClick, ''),
						generateLinkItem(serviceURL, name, 'sync', 'State sync', handleClick, ''),
						generateLinkItem(serviceURL, name, 'wasm', 'Wasm', handleClick, '')
					]
				),
				getItem(
					<Link href={serviceURL + '/installation'}>
						<span className='mr-3'>📌</span> Installation
					</Link>,
					`installation`,
					<RightOutlined />,
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
							serviceURL + '/bridge-node-installation',
							name,
							'',
							<span>Bridge Node installation</span>
						),
						generateLinkItem(serviceURL + '/installation', name, 'monitoring', <span>Monitoring</span>),
						generateLinkItem(serviceURL + '/installation', name, 'security', <span>Security</span>),
						generateLinkItem(serviceURL + '/installation', name, 'delete', <span>Delete node</span>)
					]
				),
				getItem(
					<Link href={serviceURL + '/upgrade'}>
						<span className='mr-3'>🔄</span> Upgrade
					</Link>,
					`upgrade`,
					<RightOutlined />,
					[generateLinkItem(serviceURL, name, 'manual', 'Manual upgrade', handleClick, '/upgrade')]
				),
				getItem(
					<Link href={serviceURL + '/cheat-sheet'}>
						<span className='mr-3'>📝</span> Cheat sheet
					</Link>,
					`cheat-sheet`,
					<RightOutlined />,
					[
						generateLinkItem(
							serviceURL,
							name,
							'wallet-operations',
							'Wallet operations',
							handleClick,
							'/cheat-sheet'
						),
						generateLinkItem(serviceURL, name, 'staking', 'Staking', handleClick, '/cheat-sheet'),
						generateLinkItem(serviceURL, name, 'multisign', 'Multisign', handleClick, '/cheat-sheet'),
						generateLinkItem(serviceURL, name, 'masp', 'Masp', handleClick, '/cheat-sheet'),
						generateLinkItem(
							serviceURL,
							name,
							'validator-operations',
							'Validator Operations',
							handleClick,
							'/cheat-sheet'
						),
						generateLinkItem(serviceURL, name, 'governance', 'Governance', handleClick, '/cheat-sheet'),
						generateLinkItem(
							serviceURL,
							name,
							'sync-and-consensus',
							'Sync and Consensus',
							handleClick,
							'/cheat-sheet'
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
