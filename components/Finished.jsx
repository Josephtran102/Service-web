import styles from '@styles/CardMain.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
import projects from '@store/projects'
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

	const opacityBlock = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, delay: 0.1 },
		},
		hidden: { y: 15, opacity: 0 },
	}

	return (
		<motion.div
			className={`${styles.card__root} ${styles.finishedRoot}`}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={opacityBlock}
		>
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
							layout='responsive'
							unoptimized={true}
						/>
					</div>
				</div>
			))}
		</motion.div>
	)
}

export default Finished
//test
