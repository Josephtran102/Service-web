import { RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { getItem } from './getItem'

const generateLinkItem = (serviceURL, name, linkKey, displayName, handleClick, basePath = '') => {
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

export const getNamadaMenuItems = (type, imgURL, serviceURL, name, handleClick) => {
	return [
		getItem(
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 md:gap-3 items-center mb-2	'>
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
							serviceURL,
							name,
							'install',
							'Manual Installation',
							handleClick,
							'/installation'
						),
						generateLinkItem(
							serviceURL,
							name,
							'auto-installation',
							'Automatic Installation',
							handleClick,
							'/installation'
						),
						generateLinkItem(serviceURL, name, 'security', 'Security', handleClick, '/installation'),
						generateLinkItem(serviceURL, name, 'delete', 'Delete node', handleClick, '/installation')
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
