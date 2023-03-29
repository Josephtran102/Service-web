import { DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import Link from 'next/link'
import styles from '@styles/_Dropdown.module.scss'
import { useContext } from 'react'
import { Context } from '@context/context'

const _Dropdown = props => {
	const { theme, toggleTheme } = useContext(Context)

	let items = []
	if (props.type === 'projects') {
		items = [
			{
				key: '1',
				label: (
					<Link href='/#mainnet' className={styles.navItem}>
						Mainnets
					</Link>
				),
			},
			{
				key: '2',
				label: (
					<Link href='/#testnet' className={styles.navItem}>
						Testnets
					</Link>
				),
			},
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
				),
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
				),
			},
		]
	}
	const trigger = [props.trigger]

	return (
		<Dropdown
			menu={{ items }}
			trigger={trigger}
			open={props.open}
			overlayStyle={{
				borderRadius: '12px',
			}}
		>
			<a onClick={e => e.preventDefault()}>
				{props.type}
				<DownOutlined />
			</a>
		</Dropdown>
	)
}

export default _Dropdown
