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
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { Context } from '@context/context'
import { smoothScroll } from '@utils/smoothScroll'

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [opacity, setOpacity] = useState(false)

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
			<Head>
				<title>
					ITRocket - Trusted Validator &amp; Interchain Utility Provider!
				</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
			</Head>

			<Header />

			<main>
				<section className={styles.hero}>
					<ParticlesBG />
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
									<h3 className={styles.hero__heading}>
										Trusted Validator &amp; Interchain Utility Provider
									</h3>

									<span className={styles.hero__desc}>
										With few simple steps you can delegate funds to our trusted
										validators or explore our services where you can find guides
										that will be useful for node operators.
									</span>
								</div>
								<div className={styles.hero__links}>
									<Link
										href='#mainnet'
										className={styles.button}
										onClick={event => smoothScroll(event)}
									>
										Delegate
									</Link>
									<Link
										href='/services'
										className={
											theme === 'light' ? styles.button : styles.button__dark
										}
									>
										Services
									</Link>
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
