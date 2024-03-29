import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { Context } from '@context/context'
import '@styles/Footer.module.scss'
import styles from '@styles/Footer.module.scss'

const Footer = props => {
	const { theme, toggleTheme } = useContext(Context)

	return (
		<footer
			className={styles.footer}
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a'
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
					<span>
						Developed with{' '}
						<span
							className='inline-block h-5 w-5 bg-red-400 align-top '
							aria-hidden='true'
							style={{ WebkitMask: "url('/icons/heart.svg') 50% 50% no-repeat" }}
						/>{' '}
						for the Web3 community.
					</span>
					<span className='text-slate-600'>© ITRocket Team. All rights reserved</span>
				</div>

				<div className='flex flex-col gap-2'>
					<div className='socials'>
						<a href='https://t.me/itrocket_en' target='_blank' rel='noopener noreferrer'>
							<Image src='/icons/tg.svg' alt='telegram' width={35} height={35} />
						</a>

						<a href='https://twitter.com/itrocket_team' target='_blank' rel='noopener noreferrer'>
							<Image src='/icons/twitter.svg' alt='twitter' width={35} height={35} />
						</a>
						<a href='https://github.com/itrocket-am' target='_blank' rel='noopener noreferrer'>
							<Image
								src='/icons/github.svg'
								alt='github'
								width={35}
								height={35}
								style={{ display: theme === 'light' ? 'block' : 'none' }}
							/>
							<Image
								src='/icons/github-white.svg'
								alt='github'
								width={35}
								height={35}
								style={{ display: theme === 'dark' ? 'block' : 'none' }}
							/>
						</a>
					</div>
					<div className='flex items-center justify-center'>
						<Link href='/delegate' className='text-xs opacity-60 hover:opacity-85'>
							ITRocket validator links
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
