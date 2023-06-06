import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import styles from '@styles/Home.module.scss'
import CardMain from '@components/CardMain.jsx'
import CardTest from '@components/CardTest.jsx'
import Accordion from '@components/UI/Accordion.jsx'
import CardFinished from '@components/CardFinished.jsx'
import Link from 'next/link'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { Context } from '@context/context'
import { smoothScroll } from '@utils/smoothScroll'
import { Tabs } from 'antd'

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [opacity, setOpacity] = useState(false)

	const opacityBlock = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, delay: 0.2 }
		},
		hidden: { y: 10, opacity: 0 }
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

	const items = [
		{
			key: '1',
			label: `Mainnets`,
			children: <CardMain />
		},
		{
			key: '2',
			label: `Testnets`,
			children: <CardTest />
		},
		{
			key: '3',
			label: `Finished`,
			children: <CardFinished />
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
										operators and developers.
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
										className={theme === 'light' ? styles.button : styles.button__dark}
									>
										Services
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				<section id='mainnet'>
					<div className={styles.container}>
						<h3
							className='text-[16px] md:text-[48px] font-bold text-center mb-4 tracking-wide text-zinc-900 dark:text-white'
							id='networks'
						>
							Networks
						</h3>

						<Tabs defaultActiveKey='1' centered size={'large'} animated items={items} />
					</div>
				</section>

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
