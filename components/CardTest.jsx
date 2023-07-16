import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarFilled } from '@ant-design/icons'

import { handleMouseMove } from '@utils/handleMouseMove'
import styles from '@styles/Card.module.scss'
import projects from 'data/projects'
import { Context } from '@context/context'

const Card = () => {
	const { theme, toggleTheme } = useContext(Context)

	let data = projects.testnet

	const handleOnMouseMove = e => {
		handleMouseMove(e)
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
						{data[item].explorer === '' || data[item].explorer === undefined ? (
							<a
								href={`https://testnet.itrocket.net/${item.toLowerCase()}/staking`}
								className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
								target='_blank'
								rel='noopener noreferrer'
							>
								Explorer
							</a>
						) : (
							<a
								href={data[item].explorer}
								target='_blank'
								rel='noopener noreferrer'
								className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
							>
								Explorer
							</a>
						)}
					</div>
					{projects.testnet[item].fav === 'true' ? (
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
