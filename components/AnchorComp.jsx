import { Anchor } from 'antd'
import styles from '@styles/Services.module.scss'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@context/context'

const AnchorComp = props => {
	const { theme, toggleTheme } = useContext(Context)
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		if (theme === 'dark') {
			let link = document.getElementsByClassName('ant-anchor-link-title')
			for (let i = 0; i < link.length; i++) {
				if (link) link[i].style.color = '#fff'
			}
		}

		setTimeout(() => {
			setOpacity(1)
		}, 1)
	}, [])

	return (
		<div className={styles.anchor__wrapper}>
			<Anchor
				offsetTop={35}
				theme={theme}
				style={{ opacity: opacity }}
				items={props.items}
			/>
		</div>
	)
}
export default AnchorComp
