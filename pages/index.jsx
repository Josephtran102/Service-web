import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import styles from '@styles/Home.module.scss'
import CardMain from '@components/CardMain.jsx'
import CardTest from '@components/CardTest.jsx'
import Accordion from '@components/Accordion.jsx'
import Finished from '@components/Finished.jsx'
import Link from 'next/link'
import Footer from '@components/Footer'
import Header from '@components/Header'
import { Context } from '@context/context'

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [showing, setShowing] = useState(false)
	const [opacity, setOpacity] = useState(false)

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerDirection: -1,
			},
		},
	}

	const opacityBlock = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, delay: 0.2 },
		},
		hidden: { y: 10, opacity: 0 },
	}

	useEffect(() => {
		const onPageLoad = () => {
			setOpacity(0)
			setTimeout(() => {
				setShowing(true)
			}, 500)
		}

		if (document.readyState === 'complete') {
			onPageLoad()
		} else {
			window.addEventListener('load', onPageLoad)

			return () => window.removeEventListener('load', onPageLoad)
		}
	}, [])

	return (
		<>
			{!showing ? (
				<div
					className='loader__wrapper'
					style={{
						backgroundColor:
							theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
						opacity: opacity,
					}}
				>
					<div className='loader'></div>
				</div>
			) : (
				<></>
			)}

			<Head>
				<title>
					ITRocket - Trusted Validator & Interchain Utility Provider!
				</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
			</Head>

			<Header />

			<main>
				<section className={styles.hero}>
					<div className={styles.container} style={{ paddingRight: '0px' }}>
						<motion.div
							initial='hidden'
							animate='visible'
							variants={opacityBlock}
							className={styles.hero__wrapper}
						>
							<div
								className={styles.hero__column}
								id={styles.hero__descStaking}
							>
								<div className={styles.hero__columnRoot}>
									<h3 className={styles.hero__heading}>Staking provider</h3>
									<div className={styles.hero__dividerWrapper}>
										<svg
											width='50'
											height='20'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M2 8.5 6.2 4l7.8 6 6.6-5.55L27.5 10l4.65-5.1L39.2 10'
												stroke='#5AD3AF'
												strokeWidth='3'
											/>
										</svg>
									</div>

									<span className={styles.hero__desc}>
										Hi, we are ITRocket team! Hope you are having a great day
										and welcome aboard! With few simple steps you can{' '}
										<Link href='/#mainnet' className={styles.link}>
											delegate funds
										</Link>{' '}
										to our trusted validators. With your support we can develop
										Web3 and create the great feature of decentralized services
										together!
									</span>
								</div>
							</div>
							<div
								className={styles.hero__column}
								id={styles.hero__descServices}
							>
								<div className={styles.hero__columnRoot}>
									<h3 className={styles.hero__heading}>Project support</h3>

									<div className={styles.hero__dividerWrapper}>
										<svg
											width='50'
											height='20'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M2 8.5 6.2 4l7.8 6 6.6-5.55L27.5 10l4.65-5.1L39.2 10'
												stroke='#A655E8'
												strokeWidth='3'
											/>
										</svg>
									</div>

									<span className={styles.hero__desc}>
										On{' '}
										<Link href='/services' className={styles.link}>
											services page
										</Link>{' '}
										you can find guides that will be useful for node operators:
										installation guides and useful commands. These tools include
										an API, RPC, gRPC, addrbook (updated on an hourly basis),
										Snapshot (updated every 4 hours), State Sync Services and
										IBC Relayers.
									</span>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				<section id={styles.mainnetSection}>
					<div className={styles.container}>
						<div className={styles.card__wrapper}>
							<h3 className={styles.title} id='mainnet'>
								Mainnets
							</h3>
							<p className={styles.description}>
								<span>Low commission and </span>
								<span>24/7 node monitoring.</span>
								<br />
								<span>Delegate your tokens to our trusted validator!</span>
							</p>
							<CardMain />
						</div>
					</div>
				</section>

				<section id='testnet'>
					<div className={styles.container}>
						<div className={styles.card__wrapper}>
							<h3 className={styles.title}>Active Testnets</h3>
							<p className={styles.description}>
								<span>Here are some basic tools for node operators 🛠️</span>
							</p>
							<CardTest />
						</div>
					</div>
				</section>

				<section>
					<div className={styles.container}>
						<div className={styles.card__wrapper}>
							<h3 className={styles.title} id='testnet'>
								Finished Testnets
							</h3>
							<p className={styles.description}>
								<span>
									These are the projects that we proudly took part in.
								</span>
							</p>
							<Finished />
						</div>
					</div>
				</section>

				<section>
					<div className={styles.container}>
						<div className={styles.accordion__wrapper}>
							<h3 className={styles.hero__heading} id='faq'>
								FAQ
							</h3>
							<Accordion />
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}

export default Home
