import Head from 'next/head'

import styles from '@styles/Services.module.scss'
import Header from '@components/Header'

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
						<p className={styles.text_secondary}>Last Updated: December 30, 2023</p>
						<p className='font-bold pt-1 pb-5'>
							{' '}
							This Privacy Policy describes the way ITRocket (“we”, “us” or “our”) may collect, process, or
							share personal data. This policy covers the use of all services provided by ITRocket
							(“Services”) and does not apply to information collected offline, on other websites, or by
							third parties, including linked content or applications. By using our services, you accept
							this Privacy Policy.
						</p>
						<h3 id='data-collection'>1. Data Collection</h3>
						<p>While providing our Services, we may collect the following categories of data:</p>
						<ul>
							<li>
								<strong>Personal Data:</strong> your name, email address, social media account details;
							</li>
							<li>
								<strong>Technical Information:</strong> IP address, operating system, browser type;
							</li>
							<li>
								<strong>Usage Data:</strong> information on the way you interact with our Services;
							</li>
							<li>
								<strong>Blockchain Request Data.</strong> This data is not used to reveal your identity.
								However, remember that blockchain transactions are publicly available and can be traced.
							</li>
						</ul>

						<h3 id='data-use'>2. Data Use</h3>
						<p>Your personal data may be used in the following purposes:</p>
						<ul>
							<li>Providing our Services and enhancing them;</li>
							<li>Sending notifications via social media and communicating about the Services;</li>
							<li>Safeguarding our rights, property, and ensuring our terms;</li>
							<li>Adhering to relevant laws and regulations.</li>
						</ul>

						<h3 id='data-security'>3. Data Security</h3>
						<p>
							We have established necessary security measures to safeguard your personal data against
							unauthorized access, use, or disclosure.
						</p>

						<h3 id='data-sharing'>4. Data Sharing</h3>
						<p>Your personal data may be shared under these circumstances:</p>
						<ul>
							<li>With your consent or as per your instructions;</li>
							<li>If required by law, or in response to a legal request;</li>
							<li>With service providers which we cooperate with;</li>
							<li>In case of any corporate changes, including merger, sale, or transfer of assets;</li>
						</ul>
						<p>We do not share personal information with third parties for their marketing purposes.</p>

						<h3 id='data-subject-rights'>5. Data Subject Rights</h3>
						<p>
							Legal rights concerning your personal data, such as accessing, correcting, or deleting it, may
							be available to you based on your location and relevant regulations.
						</p>

						<h3 id='international-data-transmissions'>6. International Data Transmissions</h3>
						<p>
							By using our Service, you consent to сollection, use and sharing of your personal data in any
							country where we operate or involve service providers.
						</p>

						<h3 id='policy-changes'>7. Policy Changes</h3>
						<p>
							We have the right to change our Privacy Policy. In case of any changes, you will notify you by
							updating the date when last updated.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default PrivacyPolicy
