import Image from 'next/image'
import styles from '@styles/CardMain.module.scss'
import { Context } from '@context/context'
import projects from '@store/projects'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import Link from 'next/link'

const Card = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [modalOpen, setModalOpen] = useState(false)
	const close = () => setModalOpen(false)
	const open = () => setModalOpen(true)
	let data = projects.mainnet

	const handleOnMouseMove = e => {
		const { currentTarget: target } = e

		const rect = target.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top

		target.style.setProperty('--mouse-x', `${x}px`)
		target.style.setProperty('--mouse-y', `${y}px`)
	}

	const NYMDesc = (
		<>
			<b>ITRocket team invites you to delegate to our nodes! </b>
			<br />
			<br /> <b>Only 3% fees</b> - guaranteed to never go up <br /> <br />
			We offer you: <br />
			🚀 High quality hardware <br />
			🚀 Only one node on the server <br />
			🚀 24/7 node monitoring <br />
			🚀 Tech support for delegators
			<br />
			<br /> If you have any questions, feel free to contact us on{' '}
			<a href='https://t.me/SEM3gs' style={{ color: '#44b5dd' }}>
				Telegram!
			</a>
			<br />
			<br />
			<div className={styles.delegeteWrapper}>
				<div>
					<b>USA Mix node Identity Key: </b>
					6L1geN6S9n7SMvgajjptj6p96sCSMfxWmbR8dJ3G3f5
					<br />
					<div className='center-flex'>
						<button className={styles.btnDelegate_blue}>
							<a
								href='https://mixnet.explorers.guru/mixnode/6L1geN6S9n7SMvgajjptj6p96sCSMfxWmbR8dJ3G3f5'
								rel='noopener noreferrer'
								target='_blank'
							>
								Delegate
							</a>
						</button>
					</div>
				</div>
				<br />
				<div>
					<b>Canada Mix node Identity Key: </b>{' '}
					46E69fLa7dD6VdrN4dGrYhfoJ3dJA7auouxeZCRJKAtL
					<br />
					<div className='center-flex'>
						<button className={styles.btnDelegate}>
							<a
								href='https://mixnet.explorers.guru/mixnode/46E69fLa7dD6VdrN4dGrYhfoJ3dJA7auouxeZCRJKAtL'
								rel='noopener noreferrer'
								target='_blank'
							>
								Delegate
							</a>
						</button>
					</div>
				</div>
			</div>
		</>
	)

	const FortaDesc = (
		<>
			<b>ITRocket team invites you to delegate to our node. Welcome aboard!</b>
			<br />
			<br />
			We offer you: <br />
			🚀 High quality hardware <br />
			🚀 Only one node on the server <br />
			🚀 24/7 node monitoring <br />
			🚀 Tech support for delegators
			<br />
			<br /> If you have any questions, feel free to contact us on{' '}
			<a href='https://t.me/SEM3gs' style={{ color: '#44b5dd' }}>
				Telegram!
			</a>
			<br /> <br />
			<div className={styles.delegateWrapper}>
				<div>
					<b>Forta Ethereum scan node: </b>
					<div className='center-flex'>
						<button className={styles.btnDelegate_blue}>
							<a
								href='https://app.forta.network/nodePool/104/'
								rel='noopener noreferrer'
								target='_blank'
							>
								Delegate
							</a>
						</button>
					</div>
				</div>
				<div className={styles.delegateColumn}>
					<b>Forta Optymism scan node: </b>
					<div className='center-flex'>
						<button className={styles.btnDelegate}>
							<a
								href='https://app.forta.network/nodePool/272/'
								rel='noopener noreferrer'
								target='_blank'
							>
								Delegate
							</a>
						</button>
					</div>
				</div>
			</div>
		</>
	)

	const QuicksilverDesc = (
		<>
			<b>
				ITRocket team invites you to delegate to to our Quicksilver validator!
			</b>
			<br />
			<br /> <b>Only 3% fees</b> - guaranteed to never go up <br />
			<br />
			We offer you: <br />
			🚀 High quality hardware <br />
			🚀 Only one node on the server <br />
			🚀 24/7 node monitoring <br />
			🚀 Tech support for delegators
			<br />
			<br />
			<span>
				You can stake your own tokens and locked tokens. If you have any
				questions, feel free to contact us on{' '}
			</span>
			<a href='https://t.me/SEM3gs' style={{ color: '#44b5dd' }}>
				Telegram!
			</a>
			<br /> <br />
			<div>
				<b>Validator address: </b> <br />
				quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x
			</div>
			<br />
			<b>Link to the explorer: </b> <br />
			<a
				href='https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x'
				rel='noopener noreferrer'
				target='_blank'
			>
				https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x
			</a>
			<br /> <br />
			<div className='center-flex'>
				<button className={styles.btnDelegate}>
					<Link href='/delegate/quicksilver'>Delegate</Link>
				</button>
			</div>
		</>
	)

	const ArkhadianDesc = (
		<>
			<b>
				ITRocket team invites you to delegate to to our Arkhadian validator!
			</b>
			<br />
			We offer you: <br />
			🚀 High quality hardware <br />
			🚀 Only one node on the server <br />
			🚀 24/7 node monitoring <br />
			🚀 Tech support for delegators
			<br />
			<br />
			<span>
				You can stake your own tokens and locked tokens. If you have any
				questions, feel free to contact us on{' '}
			</span>
			<a href='https://t.me/SEM3gs' style={{ color: '#44b5dd' }}>
				Telegram!
			</a>
			<br /> <br />
			<div>
				<b>Validator address: </b> <br />
				arkhvaloper18u4es3gnjerdqw3u96pjdq6ukclysh3f9wfmqe
			</div>
			<br />
			<div className='center-flex'>
				<button className={styles.btnDelegate}>
					<Link href='https://mainnet.itrocket.net/arkhadian/staking/arkhvaloper18u4es3gnjerdqw3u96pjdq6ukclysh3f9wfmqe'>
						Delegate
					</Link>
				</button>
			</div>
		</>
	)

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const listItem = {
		hidden: { opacity: 0, y: 15 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
			},
		},
	}

	useEffect(() => {
		document.body.style.overflow = modalOpen ? 'hidden' : 'visible'
	}, [modalOpen])

	const [modalDesc, setModalDesc] = useState(false)

	const toggleModalDesc = name => {
		console.log(name)
		if (name === 'NYM') setModalDesc(NYMDesc)
		else if (name === 'Forta') setModalDesc(FortaDesc)
		else if (name === 'Quicksilver') setModalDesc(QuicksilverDesc)
		else setModalDesc(ArkhadianDesc)
	}

	return (
		<motion.div
			className={styles.card__root}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true }}
			variants={container}
		>
			{Object.keys(data).map(item => (
				<motion.div
					className={styles.card}
					key={item}
					variants={listItem}
					style={{ backgroundColor: theme === 'dark' ? '#222' : '#fff' }}
					onMouseMove={e => handleOnMouseMove(e)}
				>
					<h5 className={styles.card__heading}>
						{data[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
					</h5>
					<div className={styles.card__img}>
						<Image
							src={require('../public/mainnet/'.concat(data[item].imgUrl))}
							alt='item'
							layout='responsive'
							width='100'
							height='100'
						/>
					</div>
					<div className={styles.button__wrapper}>
						<button
							className={
								theme === 'light'
									? styles.buttonDelegate
									: styles.buttonDelegate_dark
							}
							role='button'
							onClick={() => {
								modalOpen ? close() : open()
								toggleModalDesc(
									data[item].name ||
										item.charAt(0).toUpperCase() + item.slice(1)
								)
							}}
						>
							Delegate
						</button>

						<a
							href={item.link}
							target='_blank'
							rel='noopener noreferrer'
							className={
								theme === 'light'
									? styles.buttonExplorer
									: styles.buttonExplorer_dark
							}
							role='button'
						>
							Explorer
						</a>
					</div>
				</motion.div>
			))}
			<AnimatePresence initial={false} onExitComplete={() => null}>
				{modalOpen && (
					<Modal
						text={modalDesc}
						modalOpen={modalOpen}
						handleClose={close}
						theme={theme}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default Card
