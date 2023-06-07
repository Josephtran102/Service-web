import styles from '@styles/Card.module.scss'
import Image from 'next/image'
import projects from 'data/projects'
import { useContext } from 'react'
import { Context } from '@context/context'

const Finished = () => {
	const { theme, toggleTheme } = useContext(Context)

	let data = projects.finished

	const handleOnMouseMove = e => {
		const { currentTarget: target } = e

		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top

		target.style.setProperty('--mouse-x', `${x}px`)
		target.style.setProperty('--mouse-y', `${y}px`)
	}

	return (
		<div className={`${styles.card__root} ${styles.finishedRoot}`}>
			{data.map(item => (
				<div
					className={`${styles.card} ${styles.finishedCard}`}
					key={item.name}
					style={{ backgroundColor: theme === 'dark' ? '#222' : '#fff' }}
					onMouseMove={e => handleOnMouseMove(e)}
				>
					<h5 className={styles.card__heading}>{item.name}</h5>
					<div className={styles.card__img}>
						<Image
							src={require('@public/finished/'.concat(item.imgUrl))}
							alt='project logo'
							width={50}
							height={50}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default Finished
