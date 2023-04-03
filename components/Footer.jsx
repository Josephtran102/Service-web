import { Context } from '@context/context'
import '@styles/Footer.module.scss'
import styles from '@styles/Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

const Footer = props => {
	const { theme, toggleTheme } = useContext(Context)

	return (
		<footer
			className={styles.footer}
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#171717',
				position: props.position === 'absolute' ? 'absolute' : 'relative',
				bottom: '0',
			}}
		>
			<div className={styles.container}>
				<div className={styles.footer__logo}>
					<Link href='/'>
						<Image
							src='/logo.svg'
							alt='logo'
							width={220}
							height={100}
							className={styles.logo}
							style={{ display: theme === 'light' ? 'block' : 'none' }}
						/>

						<Image
							src='/darkLogo.svg'
							alt='logo'
							width={220}
							height={100}
							className={styles.logo}
							style={{ display: theme === 'dark' ? 'block' : 'none' }}
						/>
					</Link>
				</div>

				<div className={styles.copyright}>
					<span>Developed with ❤️ to Web3 community</span>
					<span>© 2021-2023 ITRocket Team</span>
				</div>
				<div className='socials'>
					<a
						href='https://t.me/SEM3gs'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image src='/icons/tg.svg' alt='telegram' width={40} height={40} />
					</a>

					<a
						href='https://twitter.com/SEM23404846'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image
							src='/icons/twitter.svg'
							alt='twitter'
							width={40}
							height={40}
						/>
					</a>
					<a
						href='https://github.com/itrocket-team'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image
							src='/icons/github.svg'
							alt='github'
							width={40}
							height={40}
							style={{ display: theme === 'light' ? 'block' : 'none' }}
						/>
						<Image
							src='/icons/github-white.svg'
							alt='github'
							width={40}
							height={40}
							style={{ display: theme === 'dark' ? 'block' : 'none' }}
						/>
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
