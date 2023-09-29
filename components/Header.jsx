import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '@styles/Header.module.scss'
import { Context } from '@context/context'
import Dropdown from '@components/UI/Dropdown'
import { motion } from 'framer-motion'
import { menuVariants, spring } from '@data/transitions'

const Header = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [isOpen, setIsOpen] = useState(false)
	const [accordionOpen, setAccordionOpen] = useState(false)

	const mobileLinks = [
		<Link
			href='/#networks'
			onClick={() => {
				setIsOpen(!isOpen)
			}}
		>
			Networks
		</Link>,
		<Link
			href='/services'
			onClick={() => {
				setIsOpen(!isOpen)
			}}
		>
			Services
		</Link>,
		<div
			onClick={() => {
				setAccordionOpen(!accordionOpen)
			}}
			style={{ margin: '5px 0' }}
		>
			<p style={{ marginBottom: accordionOpen ? '10px' : '0' }}> Explorer </p>
			<div
				className={styles.burgerMenu__subMenu}
				style={{ maxHeight: accordionOpen ? '100px' : '0', overflow: 'hidden' }}
				onClick={() => {
					setIsOpen(!isOpen)
				}}
			>
				<a href='https://mainnet.itrocket.net/'>Mainnet</a>
				<a href='https://testnet.itrocket.net/'>Testnet</a>
			</div>
		</div>,
		<Link
			href='/#faq'
			onClick={() => {
				setIsOpen(!isOpen)
			}}
		>
			FAQ
		</Link>,
		<div className={styles.switch__wrapper} style={{ backgroundColor: theme === 'dark' ? '#222' : '#f6f6f7' }}>
			<span>Appearance:</span>
			<div className={styles.switch} data-ison={theme === 'dark'} onClick={toggleTheme}>
				<motion.div
					className={styles.handle}
					transition={spring}
					style={{
						backgroundColor: theme === 'light' ? '#fff' : '#000'
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						focusable='false'
						viewBox='0 0 24 24'
						className={styles.sun}
						data-v-59e4a403=''
						style={{ display: theme === 'light' ? 'block' : 'none' }}
					>
						<path d='M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z'></path>
						<path d='M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z'></path>
						<path d='M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z'></path>
						<path d='M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z'></path>
						<path d='M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z'></path>
						<path d='M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z'></path>
						<path d='M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z'></path>
						<path d='M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z'></path>
						<path d='M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z'></path>
					</svg>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						focusable='false'
						viewBox='0 0 24 24'
						className={styles.moon}
						data-v-59e4a403=''
						style={{
							display: theme === 'dark' ? 'block' : 'none'
						}}
					>
						<path d='M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z'></path>
					</svg>
				</motion.div>
			</div>
		</div>
	]

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'visible'
	}, [isOpen])

	return (
		<>
			<header
				className={`${styles.header} bg-white dark:bg-[#191919] border-b border-[#00000017] dark:border-[#ffffff0c] `}
			>
				{
					<Link href='/'>
						<Image
							src='/logo.svg'
							alt='logo'
							width={180}
							height={55}
							priority
							className={styles.logo}
							style={{ display: theme === 'light' ? 'block' : 'none' }}
						/>

						<Image
							src='/darkLogo.svg'
							alt='logo'
							width={180}
							height={55}
							priority
							className={styles.logo}
							style={{ display: theme === 'dark' ? 'block' : 'none' }}
						/>
					</Link>
				}

				<div className={styles.headerNav__wrapper}>
					<nav className={styles.headerNav}>
						<ul className={theme === 'light' ? 'light' : 'dark'}>
							<li>
								<Link href='/#networks' className={styles.link}>
									Networks
								</Link>
							</li>
							<li>
								<Link href='/services' className={styles.link}>
									Services
								</Link>
							</li>
							<li>
								<Dropdown type='explorer' trigger='hover' />
							</li>

							<li>
								<Link href='/#faq' className={styles.link}>
									FAQ
								</Link>
							</li>
						</ul>
					</nav>

					<div className='divider-vertical hidden lg:block'></div>

					<div
						className={styles.switch}
						data-ison={theme === 'dark'}
						onClick={toggleTheme}
						id={styles.desktopSwitch}
					>
						<motion.div
							className={styles.handle}
							transition={spring}
							style={{
								backgroundColor: theme === 'light' ? '#fff' : '#000'
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
								focusable='false'
								viewBox='0 0 24 24'
								className={styles.sun}
								data-v-59e4a403=''
								style={{ display: theme === 'light' ? 'block' : 'none' }}
							>
								<path d='M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z'></path>
								<path d='M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z'></path>
								<path d='M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z'></path>
								<path d='M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z'></path>
								<path d='M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z'></path>
								<path d='M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z'></path>
								<path d='M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z'></path>
								<path d='M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z'></path>
								<path d='M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z'></path>
							</svg>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
								focusable='false'
								viewBox='0 0 24 24'
								className={styles.moon}
								data-v-59e4a403=''
								style={{
									display: theme === 'dark' ? 'block' : 'none'
								}}
							>
								<path d='M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z'></path>
							</svg>
						</motion.div>
					</div>

					<button
						type='button'
						onClick={() => {
							setIsOpen(!isOpen)
							setAccordionOpen(false)
						}}
						className={styles.burgerButton}
						aria-label='burgerButton'
					>
						<div className={styles.burgerIconWrapper}>
							<span
								style={{
									backgroundColor: theme === 'light' ? '#222' : '#fff',
									transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
									top: isOpen ? '6px' : '0'
								}}
							></span>
							<span
								style={{
									backgroundColor: theme === 'light' ? '#222' : '#fff',
									transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)'
								}}
							></span>
							<span
								style={{
									backgroundColor: theme === 'light' ? '#222' : '#fff',
									display: isOpen ? 'none' : 'block'
								}}
							></span>
						</div>
					</button>

					<div className='divider-vertical hidden lg:block'></div>

					<div className='hidden gap-3 lg:flex'>
						<a href='https://linktr.ee/itrocket_team' target='_blank' rel='noopener noreferrer'>
							<Image src='/icons/tg.svg' alt='telegram' width={30} height={30} />
						</a>

						<a href='https://twitter.com/itrocket_team' target='_blank' rel='noopener noreferrer'>
							<Image src='/icons/twitter.svg' alt='twitter' width={30} height={30} />
						</a>
						<a
							href='https://github.com/itrocket-am'
							target='_blank'
							rel='noopener noreferrer'
							style={{ display: theme === 'light' ? 'block' : 'none' }}
						>
							<Image src='/icons/github.svg' alt='github' width={30} height={30} />
						</a>
						<a
							href='https://github.com/itrocket-am'
							target='_blank'
							rel='noopener noreferrer'
							style={{ display: theme !== 'light' ? 'block' : 'none' }}
						>
							<Image src='/icons/github-white.svg' alt='github' width={30} height={30} />
						</a>
					</div>
				</div>
			</header>

			<motion.div
				className={styles.burgerMenu}
				style={{
					backgroundColor: theme === 'dark' ? '#161616' : '#fff',
					display: isOpen ? 'flex' : 'none'
				}}
				initial='hidden'
				animate={isOpen ? 'visible' : 'hidden'}
				variants={menuVariants}
				transition={{ duration: 0.3, delay: 0.2 }}
			>
				<nav>
					<ul>
						{mobileLinks.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</nav>

				<div className='socials'>
					<a href='https://linktr.ee/itrocket_team' target='_blank' rel='noopener noreferrer'>
						<Image src='/icons/tg.svg' alt='telegram' width={30} height={30} />
					</a>

					<a href='https://twitter.com/itrocket_team' target='_blank' rel='noopener noreferrer'>
						<Image src='/icons/twitter.svg' alt='twitter' width={30} height={30} />
					</a>
					<a
						href='https://github.com/itrocket-am'
						target='_blank'
						rel='noopener noreferrer'
						style={{ display: theme === 'light' ? 'block' : 'none' }}
					>
						<Image src='/icons/github.svg' alt='github' width={30} height={30} />
					</a>
					<a
						href='https://github.com/itrocket-am'
						target='_blank'
						rel='noopener noreferrer'
						style={{ display: theme !== 'light' ? 'block' : 'none' }}
					>
						<Image src='/icons/github-white.svg' alt='github' width={30} height={30} />
					</a>
				</div>
			</motion.div>
		</>
	)
}

export default Header
