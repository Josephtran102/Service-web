import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import styles from '@styles/DelegateGuide.module.scss'
import { Context } from '@context/context'
import Header from '@components/Header'
import Footer from '@components/Footer'
import 'highlight.js/styles/github.css'
import { Typography } from 'antd'
import Image from 'next/image'

const { Title, Paragraph, Text, Link } = Typography

const about = () => {
	const { theme, toggleTheme } = useContext(Context)

	useEffect(() => {
		let typo = document.getElementsByClassName('ant-typography')

		for (let i = 0; i < typo.length; i++) {
			if (theme === 'light' && typo) typo[i].style.color = '#111'
			else typo[i].style.color = '#fff'
		}
	}, [theme])

	return (
		<>
			<Head>
				<title>Support - ITRocket </title>
				<meta
					name='description'
					content='ITRocket 🚀 | Crypto Multipurpose Project'
				/>
				{/* <meta property='og:title' content='Projects Support - ITRocket' />
				<meta
					property='og:description'
					content='ITRocket 🚀 | Crypto Multipurpose Project'
				/>
				<meta property='og:image' content='https://itrocket.net/logo.jpg' />
				<meta property='og:type' content='article' />
				<meta
					property='og:url'
					content='https://itrocket.net/support/mainnet/quicksilver/'
				/>
				<meta property='twitter:card' content='summary_large_image' />
				<meta
					property='twitter:url'
					content='https://itrocket.net/support/mainnet/quicksilver/'
				/>
				<meta property='twitter:title' content='Projects Support - ITRocket' />
				<meta
					property='twitter:description'
					content='ITRocket 🚀 | Crypto Multipurpose Project'
				/>
				<meta
					property='twitter:image'
					content='https://itrocket.net/logo.jpg'
				/> */}
			</Head>

			<Header />

			<div className='center-flex'>
				<div className={styles.contentWrapper}>
					<Typography>
						<Title>Quicksilver: How to stake coins?</Title>
						<Paragraph>
							You can stake both locked and unlocked tokens.
						</Paragraph>
						<Paragraph>
							<Text strong>Our validator: </Text>
							<Text copyable>
								quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x
							</Text>
						</Paragraph>
						<Paragraph>
							<Text>Explorer: </Text>
							<Link href='https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x'>
								https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x
							</Link>
						</Paragraph>
						<Title level={2}>Guideline</Title>
						<Paragraph>
							<ul>
								<li>
									<Text>Install </Text>
									<Link href='https://www.keplr.app/download'>Keplr</Link> if
									you don't already have it and restore the wallet using the
									mnemonic phrase or private key
								</li>
								<li>
									<Text>Go to the </Text>
									<Link href='https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x'>
										staking portal
									</Link>
									<Text> and connect your wallet</Text>
								</li>
							</ul>
						</Paragraph>
						<Paragraph>Connect your wallet:</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/1.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>Confirm connection:</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/2.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>
							Select the Quicksilver network, in the Account name field enter
							the name of your account, for example Quicksilver and click the
							Next button:
						</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/3.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>
							Hit confirm, you will see the address of your wallet, click Save
						</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/4.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />

						<Paragraph>Create an account on the portal</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/5.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>
							<Text>Now you need to return to the </Text>
							<Link href='https://mainnet.itrocket.net/quicksilver/staking/quickvaloper1jlh8cttv96kyxu0j0r2ppv4sga6ju4uzxa3c2x'>
								portal page
							</Link>
							<Text> and try to delegate</Text>
						</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/6.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>
							Be sure to open <b>Advanced</b> <Text>settings and set </Text>
							<b>Fee - 0, Gas - 250k.</b>
						</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/7.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
						<Paragraph>Confirm delegation ✅</Paragraph>
						<Image
							src={require('../../public/delegateGuide/quicksilver/8.jpeg')}
							alt='item'
							layout='responsive'
							width='100%'
							height='100%'
						/>
						<br />
						<br />
					</Typography>
				</div>
			</div>

			<Footer />
		</>
	)
}
export default about
