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
				<div className='flex gap-2 md:gap-3 items-center mb-2'>
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
						<Image className='mr-4' src='/icons/emoji/settings.svg' alt='telegram' width={18} height={18} />{' '}
						API & Sync
					</Link>,
					`services`,
					null,
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
						<Image className='mr-4' src='/icons/emoji/pin.svg' alt='telegram' width={18} height={18} />{' '}
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
						generateLinkItem(serviceURL + '/installation', name, 'monitoring', <span>Monitoring</span>),
						generateLinkItem(serviceURL + '/installation', name, 'security', <span>Security</span>),
						generateLinkItem(serviceURL + '/installation', name, 'delete', <span>Delete node</span>)
					]
				),
				getItem(
					<Link href={serviceURL + '/upgrade'}>
						<Image className='mr-4' src='/icons/emoji/update.svg' alt='update' width={18} height={18} />{' '}
						Upgrade
					</Link>,
					`upgrade`,
					null,
					[generateLinkItem(serviceURL, name, 'manual', 'Manual upgrade', handleClick, '/upgrade')]
				),
				getItem(
					<Link href={serviceURL + '/cheat-sheet'}>
						<Image className='mr-4' src='/icons/emoji/sheet.svg' alt='telegram' width={18} height={18} />{' '}
						Cheat sheet
					</Link>,
					`cheat-sheet`,
					null,
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
			<span className='mb-2 pt-1 block text-[13px] text-gray-400 dark:text-zinc-300/95'>
				Data Availability Nodes:
			</span>
		),
		getItem(
			<Link href={serviceURL + '/bridge-node'}>
				<Image className='mr-4' src='/icons/emoji/bridge.svg' alt='telegram' width={18} height={18} /> Bridge
			</Link>,
			`bridge-node`,
			null,
			[
				generateLinkItem(serviceURL, name, 'installation', 'Installation', handleClick, '/bridge-node'),
				generateLinkItem(serviceURL, name, 'cheat-sheet', 'Cheat Sheet', handleClick, '/bridge-node'),
				generateLinkItem(serviceURL, name, 'upgrade', 'Upgrade', handleClick, '/bridge-node'),
				generateLinkItem(serviceURL, name, 'delete', 'Delete', handleClick, '/bridge-node')
			]
		),
		getItem(
			<Link href={serviceURL + '/full-node'}>
				<Image className='mr-4' src='/icons/emoji/dna.svg' alt='telegram' width={18} height={18} /> Full
			</Link>,
			`full-node`,
			null,
			[
				generateLinkItem(serviceURL, name, 'installation', 'Installation', handleClick, '/full-node'),
				generateLinkItem(serviceURL, name, 'cheat-sheet', 'Cheat Sheet', handleClick, '/full-node'),
				generateLinkItem(serviceURL, name, 'upgrade', 'Upgrade', handleClick, '/full-node'),
				generateLinkItem(serviceURL, name, 'delete', 'Delete', handleClick, '/full-node')
			]
		),
		getItem(
			<Link href={serviceURL + '/light-node'}>
				<Image className='mr-4' src='/icons/emoji/feather.svg' alt='telegram' width={18} height={18} /> Light
			</Link>,
			`light-node`,
			null,
			[
				generateLinkItem(serviceURL, name, 'installation', 'Installation', handleClick, '/light-node'),
				generateLinkItem(serviceURL, name, 'cheat-sheet', 'Cheat Sheet', handleClick, '/light-node'),
				generateLinkItem(serviceURL, name, 'upgrade', 'Upgrade', handleClick, '/light-node'),
				generateLinkItem(serviceURL, name, 'delete', 'Delete', handleClick, '/light-node')
			]
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
					<Image className='' src='/icons/emoji/globe.svg' alt='telegram' width={18} height={18} /> Public RPC
					Scanner
				</Link>
			</div>,
			'public rpc',
			null,
			null,
			'group'
		),
		getItem(
			<div className='mb-2'>
				<Link
					className='font-normal text-sm dark:text-[#a7a7a7] flex items-center ml-3 mt-1'
					href={serviceURL + '/monitoring'}
				>
					<Image className='mr-3' src='/icons/emoji/bot.svg' alt='telegram' width={18} height={18} />{' '}
					Monitoring script
				</Link>
			</div>,
			'public rpc',
			null,
			null,
			'group'
		)
	]
}
