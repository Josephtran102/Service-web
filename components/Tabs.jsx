import { Tabs as MaterialTabs, TabsHeader, Tab } from '@material-tailwind/react'
import { currentProject } from '@utils/currentProjectByURL'
import styles from '@styles/Services.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const Tabs = () => {
	const [data, setData] = useState([])
	const windowWidth = useRef()
	const router = useRouter()

	useEffect(() => {
		windowWidth.current = window.innerWidth
		console.log(windowWidth.current)
		const project = currentProject()
		const name = project.name
		const type = project.type
		setData([
			{
				label: 'Services',
				value: 'services',
				href: `/`,
			},
			{
				label: 'Installation',
				value: 'installation',
				href: `installation`,
			},
			{
				label: 'Upgrade',
				value: 'testnet',
				href: `upgrade`,
			},
		])
	}, [])
	const { name, type } = currentProject()
	const handleTabClick = href => {
		router.push(`/services/${type}/${name}/${href}`)
	}

	return (
		<MaterialTabs
			className={styles.mobileMenu}
			value={windowWidth.current < 769 ? 'services' : ''}
		>
			<TabsHeader>
				{data.map(({ label, href, value }) => (
					<Tab
						key={label}
						value={value}
						onClick={() => handleTabClick(href)}
						style={{ margin: '3px' }}
					>
						{label}
					</Tab>
				))}
			</TabsHeader>
		</MaterialTabs>
	)
}

export default Tabs
