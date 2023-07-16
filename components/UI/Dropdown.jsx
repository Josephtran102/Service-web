import { Dropdown as AntDropdown } from 'antd'
import Link from 'next/link'

import styles from '@styles/Dropdown.module.scss'

const Dropdown = props => {
	let items = []
	if (props.type === 'projects') {
		items = [
			{
				key: '1',
				label: (
					<Link href='/#mainnet' className={styles.navItem}>
						Mainnets
					</Link>
				)
			},
			{
				type: 'divider'
			},
			{
				key: '2',
				label: (
					<Link href='/#testnet' className={styles.navItem}>
						Testnets
					</Link>
				)
			}
		]
	} else {
		items = [
			{
				key: '3',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://mainnet.itrocket.net/'
						className={styles.navItem}
					>
						Mainnet
					</a>
				)
			},
			{
				type: 'divider'
			},
			{
				key: '4',
				label: (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://testnet.itrocket.net/'
						className={styles.navItem}
					>
						Testnet
					</a>
				)
			}
		]
	}
	const trigger = [props.trigger]

	return (
		<AntDropdown
			menu={{ items }}
			trigger={trigger}
			open={props.open}
			overlayStyle={{
				borderRadius: '12px'
			}}
		>
			<a onClick={e => e.preventDefault()}>{props.type}</a>
		</AntDropdown>
	)
}

export default Dropdown
