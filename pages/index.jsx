import { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tabs } from 'antd'

import Header from '@components/Header'
import ParticlesBG from '@components/ParticlesBG/ParticlesBG'
import { Context } from '@context/context'
import { smoothScroll } from '@utils/smoothScroll'
import { opacityBlock } from '@data/transitions'
import { countApr } from '@utils/updateAPR'
import projects from '@data/projects.json'
import Spinner from '@components/UI/Spinner'
import styles from '@styles/Home.module.scss'
import Card from '@components/UI/Card'
const Footer = dynamic(() => import('@components/Footer'))
const Accordion = dynamic(() => import('@components/UI/Accordion.jsx'))
const FloatButton = dynamic(() => import('@components/UI/FloatButton'))

export async function getStaticProps() {
	return {
		props: { projects }
	}
}

const Home = () => {
	const { theme, toggleTheme } = useContext(Context)
	const [aprValues, setAprValues] = useState(null)
	const [projectsCount, setProjectsCount] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const onPageLoad = () => {
			setIsLoading(false)
		}

		const fetchAprValues = async () => {
			const entries = Object.entries(projects.mainnet)
			const promises = entries.map(async ([name]) => {
				const apr = await countApr(name)
				return { name, apr }
			})

			const results = await Promise.all(promises)
			const aprValues = results.reduce((acc, { name, apr }) => {
				acc[name] = apr
				return acc
			}, {})

			setAprValues(aprValues)
		}

		fetchAprValues()

		setProjectsCount(prev => ({
			...prev,
			mainnet: Object.entries(projects.mainnet)?.length,
			testnet: Object.entries(projects.testnet)?.length
		}))

		console.log('%cITRocket 🚀', 'color: purple; font-size: 38px;')

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
					<h3 className='ant-tabs-heading'>Mainnet</h3>
					<Card data={projects.mainnet} aprValues={aprValues} />
					<h3 className='ant-tabs-heading'>Testnet</h3>
					<Card data={projects.testnet} />
				</>
			)
		},
		{
			key: '2',
			label: `Mainnet (${projectsCount?.mainnet})`,
			children: (
				<>
					<Card data={projects.mainnet} aprValues={aprValues} />
				</>
			)
		},
		{
			key: '3',
			label: `Testnet (${projectsCount?.testnet})`,
			children: (
				<>
					<Card data={projects.testnet} />
				</>
			)
		}
	]

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<Head>
				<title>ITRocket - Trusted Validator &amp; Interchain Utility Provider!</title>
				<meta
					name='description'
					content='ITRocket 🚀 - Crypto multipurpose project focused on providing best services for Cosmos (and not only) node operators'
				/>
				<meta
					name='keywords'
					content='ITRocket, it rocket, validator, cosmos, cosmos installation, nodes, blockchain'
				/>
			</Head>
			<Header />

			<main>
				<FloatButton />
				<section
					className={styles.hero}
					style={{
						backgroundColor: theme === 'dark' ? '#171717' : ' #fff'
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
									<h1 className='font-bold  mb-[15px] text-[26px] md:text-[38px] lg:text-[50px]'>
										Trusted Validator &amp; Interchain Utility Provider
									</h1>
									<span className={styles.hero__desc}>
										With few simple steps you can delegate funds to our trusted validators or explore our
										services where you can find tools that will be useful for node operators and
										developers.
									</span>
								</div>
								<div className={styles.hero__links}>
									<Link
										href='#networks'
										className={styles.button}
										onClick={e => smoothScroll(e, 'networks')}
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
						<h2 className='text-[22px] md:text-[42px] font-bold  mb-2 md:mb-6 tracking-wide text-zinc-900 dark:text-white'>
							Networks
						</h2>

						<Tabs type='card' defaultActiveKey='1' size={'large'} items={items} />
					</div>
				</motion.section>

				<section className='bg-white dark:bg-[#191919]'>
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
