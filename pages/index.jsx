import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import styles from '@styles/Home.module.scss'
import CardMain from '@components/CardMain.jsx'
import CardTest from '@components/CardTest.jsx'
import Accordion from '@components/UI/Accordion.jsx'
import Link from 'next/link'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { Context } from '@context/context'
import { smoothScroll } from '@utils/smoothScroll'
import { Tabs } from 'antd'
import { opacityBlock } from '@data/transitions'

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [opacity, setOpacity] = useState(false)

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

	const items = [
		{
			key: '1',
			label: `All`,
			children: (
				<>
					<h3 className={styles.title}>Mainnet.</h3>
					<CardMain />
					<h3 className={styles.title}>Testnet.</h3>
					<CardTest />
				</>
			)
		},
		{
			key: '2',
			label: `Mainnet`,
			children: (
				<>
					<h3 className={styles.title}>Mainnet.</h3>
					<CardMain />
				</>
			)
		},
		{
			key: '3',
			label: `Testnet`,
			children: (
				<>
					<h3 className={styles.title}>Testnet.</h3>
					<CardTest />
				</>
			)
		}
	]

	return (
		<>
			<Head>
				<title>ITRocket - Trusted Validator &amp; Interchain Utility Provider!</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
			</Head>

			<Header />

			<main>
				<section
					className={styles.hero}
					style={{
						backgroundColor: theme === 'dark' ? '#141414' : ' #fff'
					}}
				>
					<ParticlesBG />
					<div className={styles.container}>
						<motion.div
							initial='hidden'
							animate='visible'
							variants={opacityBlock}
							className={styles.hero__wrapper}
						>
							<div className={styles.hero__column} id={styles.hero__descStaking}>
								<div className={styles.hero__columnRoot}>
									<h3 className={styles.hero__heading}>
										Trusted Validator &amp; Interchain Utility Provider
									</h3>

									<span className={styles.hero__desc}>
										With few simple steps you can delegate funds to our trusted validators or
										explore our services where you can find tools that will be useful for node
										operators and developers. {process.env.JWT_SECRET}
									</span>
								</div>
								<div className={styles.hero__links}>
									<Link
										href='#networks'
										className={styles.button}
										onClick={event => smoothScroll(event)}
									>
										Delegate
									</Link>
									<Link
										href='/services'
										className={theme === 'light' ? styles.button : styles.button__dark}
									>
										Services
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				<motion.section
					id='networks'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={opacityBlock}
				>
					<div className={styles.container}>
						<h3 className='text-[21px] md:text-[48px] font-bold text-center mb-1 md:mb-4 tracking-wide text-zinc-900 dark:text-white'>
							Networks
						</h3>

						<Tabs defaultActiveKey='1' centered size={'large'} items={items} />
					</div>
				</motion.section>

				<section
					style={{
						backgroundColor: theme === 'dark' ? '#141414' : ' #fff'
					}}
				>
					<div className={styles.container}>
						<div className={styles.accordion__wrapper}>
							<h3 className={styles.hero__heading} id='faq'>
								Frequently Asked Questions
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
