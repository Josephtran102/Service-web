import Head from 'next/head'

import Header from '@components/Header'
import styles from '@styles/Services.module.scss'

const PrivacyPolicy = () => {
	return (
		<>
			<Head>
				<title>Services - ITRocket</title>
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
						<h1 style={{ paddingTop: '0px' }}>Privacy Policy </h1>
						<p className={styles.text_secondary}>Last Updated: February 1, 2024</p>
						<p className='font-bold pt-1 pb-5'>
							{' '}
							This Privacy Policy describes the way ITRocket (“we”, “us” or “our”) may collect, process, or
							share personal data. This policy covers the use of all services provided by ITRocket
							(“Services”) and does not apply to information collected offline, on other websites, or by
							third parties, including linked content or applications. By using our services, you accept
							this Privacy Policy.
							<br />
							<br />
							We do not store, use, and share personal data. In case of any changes, this notification and
							the date when last updated will be revised, and the terms below will become applicable to data
							processing.
						</p>

						<h3 id='data-collection'>1. Data Collection</h3>
						<p>
							Aligned with our core commitment to privacy, we do not collect any user data. This approach is
							fundamental to our belief in the power of privacy to foster freedom and innovation. By
							refraining from collecting any personal information, we ensure our users' privacy is not just
							protected but completely guaranteed.
						</p>
						<h3 id='data-use'>2. Data Use</h3>
						<p>
							Given our policy of not collecting personal data, there is no use of such data for any
							purposes. This ensures the utmost respect for user privacy and freedom.
						</p>
						<h3 id='data-security'>3. Data Security</h3>
						<p>
							In line with our no data collection policy, there are no personal data security measures
							necessary. We focus on maintaining a secure environment that respects and upholds user privacy
							at all times.
						</p>
						<h3 id='data-sharing'>4. Data Sharing</h3>
						<p>
							Since we do not collect any personal data, there is no possibility of sharing personal data
							under any circumstances. Our commitment to privacy ensures complete confidentiality for our
							users.
						</p>
						<h3 id='data-subject-rights'>5. Data Subject Rights</h3>
						<p>
							As no personal data is collected, users do not need to exercise any rights regarding personal
							data protection, providing a hassle-free experience while respecting privacy laws.
						</p>
						<h3 id='international-data-transmissions'>6. International Data Transmissions</h3>
						<p>
							The absence of personal data collection eliminates any concerns regarding the international
							transmission of such data. Our approach ensures compliance with privacy laws across
							jurisdictions, aligning with the evolving legal landscape concerning data protection.
						</p>
						<h3 id='legal-compliance'>7. Compliance with Privacy Laws</h3>
						<p>
							Despite not collecting personal data, we remain committed to complying with all applicable
							privacy laws and regulations across jurisdictions. This adherence confirms our dedication to
							upholding the highest standards of data protection and privacy.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default PrivacyPolicy
