import Head from 'next/head'

import Header from '@components/Header'
import styles from '@styles/Services.module.scss'
import Image from 'next/image'

const PrivacyPolicy = () => {
	return (
		<>
			<Head>
				<title>NYM Node - ITRocket</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<Header />

			<div className='w-full p-1 md:p-6 bg-white dark:bg-zinc-900/40'>
				<div
					className={styles.mainColumn__wrapper}
					style={{
						width: '100%',
						padding: '10px',
						marginTop: '60px'
					}}
				>
					<div className={styles.mainColumn}>
						<h1 className='!flex items-center gap-3 tracking-wide'>
							ITRocket NYM Node{' '}
							<Image
								className='my-1 mr-2 '
								src={require(`../public/mainnet/nym.png`)}
								alt='project logo'
								width='30'
								height='30'
								style={{
									borderRadius: '50%',
									backgroundColor: '#fff'
								}}
							/>
						</h1>
						<br />
						As Trusted Validator & Interchain Utility Provider, we prioritize the security and efficiency of
						our node. <br />
						<br />
						<h3 className='font-semibold pt-1'>Key features:</h3>
						<ol className='space-y-3 lg:space-y-4 ml-4 mt-1'>
							<li className='list-decimal mt-1'>
								<span className='font-semibold'>Decentralization Advocates:</span>
								<br />
								We are actively contributing to decentralization within the NYM network by hosting our node
								in Seoul, leveraging the reliable Vultr infrastructure.
							</li>
							<li className='list-decimal'>
								<span className='font-semibold'>Detailed Monitoring:</span>
								<br />
								We ensure 24/7 monitoring of our NYM node using a comprehensive system that includes
								industry-standard tools like Zabbix and Prometheus with Grafana.
							</li>
							<li className='list-decimal'>
								<span className='font-semibold'>Timely Upgrades and Good Uptime:</span>
								<br />
								We prioritize timely upgrades and maintain a high uptime you can count on.
							</li>
							<li className='list-decimal'>
								<span className='font-semibold'>Gateway:</span>
								<br />
								We also operate a NYM Gateway, enhancing the accessibility and functionality of the NYM
								network.
							</li>
						</ol>
						<span className='font-semibold pt-7'>
							Delegate to our node with confidence here:{' '}
							<a
								href='https://mixnet.explorers.guru/mixnode/6L1geN6S9n7SMvgajjptj6p96sCSMfxWmbR8dJ3G3f5'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://mixnet.explorers.guru/mixnode/6L1geN6S9n7SMvgajjptj6p96sCSMfxWmbR8dJ3G3f5.
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default PrivacyPolicy
