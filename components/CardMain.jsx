import Image from 'next/image'
import styles from '@styles/Card.module.scss'
import { Context } from '@context/context'
import projects from '@store/projects'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { StarFilled } from '@ant-design/icons'
import Link from 'next/link'
import { getAprRecords } from '@utils/updateAPR'

const Card = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [records, setRecords] = useState()

	async function getRecords() {
		const records = await getAprRecords()
		setRecords(() => records)
	}

	useEffect(() => {
		getRecords()
	}, [])

	console.log(records)

	const handleOnMouseMove = e => {
		const { currentTarget: target } = e

		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top

		target.style.setProperty('--mouse-x', `${x}px`)
		target.style.setProperty('--mouse-y', `${y}px`)
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12
			}
		}
	}

	const listItem = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3
			}
		}
	}

	return (
		<motion.div
			className={styles.card__root}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true }}
			variants={container}
		>
			{Object.entries(projects.mainnet)
				.sort()
				.map(([item, value], index) => (
					<motion.div
						className={styles.card}
						key={item}
						variants={listItem}
						style={{ backgroundColor: theme === 'dark' ? '#222' : '#fff' }}
						onMouseMove={e => handleOnMouseMove(e)}
					>
						<div className={styles.card__desc}>
							<div className={styles.card__img}>
								<Image
									src={require('../public/mainnet/'.concat(projects.mainnet[item].imgUrl))}
									alt='item'
									width={50}
									height={50}
								/>
							</div>
							<h5 className={styles.card__heading}>
								{projects.mainnet[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
							</h5>
						</div>

						<div className='flex flex-col'>
							<span className='tracking-wide'>
								<span>APR: </span>
								<span style={{ fontFamily: 'JetBrains Mono', color: '#737373' }}>
									{records && records[index] && records[index].percent}
								</span>
							</span>
							<a
								href={projects.mainnet[item].delegate}
								target='_blank'
								rel='noopener noreferrer'
								className='link'
								style={{ zIndex: 10 }}
							>
								Delegate to us
							</a>
						</div>

						{projects.mainnet[item].fav === true ? (
							<div className={styles.card__star}>
								<StarFilled />
							</div>
						) : null}
						<div className={styles.button__wrapper}>
							<Link
								href={'/services/mainnet/' + item.toLowerCase()}
								className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
							>
								Services
							</Link>
							<a
								href={projects.mainnet[item].link}
								target='_blank'
								rel='noopener noreferrer'
								className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
								role='button'
							>
								Explorer
							</a>
						</div>
					</motion.div>
				))}
		</motion.div>
	)
}

export default Card
