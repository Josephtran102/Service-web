import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import styles from '@styles/Home.module.scss'
import Accordion from '@components/UI/Accordion.jsx'
import Link from 'next/link'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { Context } from '@context/context'
import { smoothScroll } from '@utils/smoothScroll'
import { Tabs } from 'antd'
import { opacityBlock } from '@data/transitions'
import { countApr } from '@utils/updateAPR'
import CardMain from '@components/CardMain'
import CardTest from '@components/CardTest'
import projects from '@data/projects.json'

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [opacity, setOpacity] = useState(false)
	const [aprValues, setAprValues] = useState(null)
	const [projectsCount, setProjectsCount] = useState(null)

	useEffect(() => {
		const onPageLoad = () => {
			setOpacity(0)
		}

		Object.keys(projects.mainnet).forEach(async (item, i) => {
			const name = item
			const apr = await countApr(name)
			setAprValues(prev => ({ ...prev, [name]: apr }))
		})

		setProjectsCount(prev => ({ ...prev, mainnet: Object.entries(projects.mainnet)?.length }))
		setProjectsCount(prev => ({ ...prev, testnet: Object.entries(projects.testnet)?.length }))

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
					<h3 className='font-semibold text-xl lg:text-[28px] text-zinc-800 mt-1 dark:text-white/80 mx-2'>
						Mainnet
					</h3>
					<CardMain projects={projects} aprValues={aprValues} />
					<h3 className='font-semibold text-xl lg:text-[28px] text-zinc-800 mt-1 dark:text-white/80 mx-2'>
						Testnet
					</h3>
					<CardTest />
				</>
			)
		},
		{
			key: '2',
			label: `Mainnet (${projectsCount?.mainnet})`,
			children: (
				<>
					<CardMain projects={projects} aprValues={aprValues} />
				</>
			)
		},
		{
			key: '3',
			label: `Testnet (${projectsCount?.testnet})`,
			children: (
				<>
					<CardTest />
				</>
			)
		}
	]

	if (!projects.mainnet) {
		return null
	}

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
									<h3 className={styles.hero__heading}>Trusted Validator &amp; Interchain Utility Provider</h3>
									<span className={styles.hero__desc}>
										With few simple steps you can delegate funds to our trusted validators or explore our services
										where you can find tools that will be useful for node operators and developers.
									</span>
								</div>
								<div className={styles.hero__links}>
									<Link href='#networks' className={styles.button} onClick={e => smoothScroll(e, 'networks')}>
										Delegate
									</Link>
									<Link href='/services' className={theme === 'light' ? styles.button : styles.button__dark}>
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
						<h3 className='text-[22px] md:text-[42px] font-bold  mb-2 md:mb-6 tracking-wide text-zinc-900 dark:text-white'>
							Networks
						</h3>

						<Tabs type='card' defaultActiveKey='1' size={'large'} items={items} />
					</div>
				</motion.section>

				<section
					style={{
						backgroundColor: theme === 'dark' ? '#141414' : ' #fff'
					}}
				>
					<div className={styles.container}>
						<div className={styles.accordion__wrapper}>
							<h3
								className='text-[22px] md:text-[42px] font-bold  mb-1 md:mb-3 tracking-wide text-zinc-900 dark:text-white'
								id='faq'
							>
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
