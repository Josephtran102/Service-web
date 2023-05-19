import Image from 'next/image'
import styles from '@styles/Card.module.scss'
import projects from '@store/projects'
import Link from 'next/link'
import { Context } from '@context/context'
import { useContext } from 'react'
import { StarFilled } from '@ant-design/icons'

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
						backgroundColor: theme === 'dark' ? '#222' : '#fff'
					}}
					onMouseMove={e => handleOnMouseMove(e)}
				>
					<div className={styles.card__desc}>
						<div className={styles.card__img}>
							<Image
								src={require('../public/testnet/'.concat(data[item].imgUrl))}
								alt='item'
								width={50}
								height={50}
							/>
						</div>
						<h5 className={styles.card__heading}>
							{data[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
						</h5>
					</div>

					<div className={styles.button__wrapper}>
						<Link
							href={'/services/testnet/' + item.toLowerCase()}
							className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
						>
							Services
						</Link>
						<a
							href={data[item].link}
							target='_blank'
							rel='noopener noreferrer'
							className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
						>
							Explorer
						</a>
					</div>
					{projects.testnet[item].fav === true ? (
						<div className={styles.card__star}>
							<StarFilled />
						</div>
					) : null}
				</div>
			))}
		</div>
	)
}

export default Card
