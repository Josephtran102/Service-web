import Image from 'next/image'
import styles from '@styles/Card.module.scss'
import { Context } from '@context/context'
import { useContext, useEffect } from 'react'
import { StarFilled } from '@ant-design/icons'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { handleMouseMove } from '@utils/handleMouseMove'

const Card = ({ projects, aprValues }) => {
	const { theme, toggleTheme } = useContext(Context)

	const handleOnMouseMove = e => {
		handleMouseMove(e)
	}

	useEffect(() => {
		console.log(aprValues)
	}, [aprValues])

	return (
		<>
			<div className={styles.card__root}>
				{Object.entries(projects.mainnet)
					.sort()
					.map(([item, value], index) => (
						<div
							className={styles.card}
							key={item}
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
								<div className='flex flex-col items-start'>
									<h5 className={styles.card__heading}>
										{projects.mainnet[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
									</h5>
									<div className='flex gap-[2px] md:gap-1 items-center tracking-wide text-[10px] md:text-sm '>
										<div>APR: </div>
										<span className='tracking-wide md:tracking-wide text-gray-500/80'>
											{aprValues ? (
												aprValues[item] !== undefined ? (
													aprValues[item]
												) : (
													'soon'
												)
											) : (
												<Skeleton
													style={{ maxWidth: '100px' }}
													active
													title={false}
													paragraph={{ rows: 1, width: 45 }}
												/>
											)}
										</span>
									</div>
								</div>
							</div>

							<a
								href={projects.mainnet[item].delegate}
								target='_blank'
								rel='noopener noreferrer'
								className='link'
								style={{ zIndex: 10 }}
							>
								Delegate funds
							</a>

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
								{projects.mainnet[item].explorer === '' || projects.mainnet[item].explorer === undefined ? (
									<a
										href={`https://mainnet.itrocket.net/${item.toLowerCase()}/staking`}
										className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
										target='_blank'
										rel='noopener noreferrer'
									>
										Explorer
									</a>
								) : (
									<a
										href={projects.mainnet[item].explorer}
										target='_blank'
										rel='noopener noreferrer'
										className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}
									>
										Explorer
									</a>
								)}
							</div>
						</div>
					))}
			</div>
		</>
	)
}

export default Card
