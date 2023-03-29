import Image from 'next/image'
import styles from '@styles/CardTest.module.scss'
import projects from '@store/projects'
import Link from 'next/link'
import { Context } from '@context/context'
import { useContext } from 'react'

const Card = () => {
	const { theme, toggleTheme } = useContext(Context)

	let data = projects.testnet

	const handleOnMouseMove = e => {
		const { currentTarget: target } = e

		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top

		target.style.setProperty('--mouse-x', `${x}px`)
		target.style.setProperty('--mouse-y', `${y}px`)
	}

	return (
		<div className={styles.card__root}>
			{Object.keys(data).map(item => (
				<div
					className={styles.card}
					key={item}
					style={{
						backgroundColor: theme === 'dark' ? '#222' : '#fff',
					}}
					onMouseMove={e => handleOnMouseMove(e)}
				>
					<h5 className={styles.card__heading}>
						{data[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
					</h5>
					<div className={styles.card__img}>
						<Image
							src={require('../public/testnet/'.concat(data[item].imgUrl))}
							alt='item'
							layout='responsive'
						/>
					</div>

					<div className={styles.button__container}>
						<a
							href={data[item].link}
							target='_blank'
							rel='noopener noreferrer'
							className={
								theme === 'light'
									? styles.buttonExplore
									: styles.buttonExplore_dark
							}
						>
							Explorer
						</a>
						<Link
							href={'/services/testnet/' + item.toLowerCase()}
							className={
								theme === 'light'
									? styles.buttonSupport
									: styles.buttonSupport_dark
							}
						>
							Services
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default Card
