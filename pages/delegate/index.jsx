import React, { useContext } from 'react'
import Head from 'next/head'
import { Typography, Table } from 'antd'
import Image from 'next/image'

import { Context } from '@context/context'
import Footer from '@components/Footer'
import Header from '@components/Header'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'

const { Title, Paragraph, Text, Link } = Typography

const About = () => {
	const { theme, toggleTheme } = useContext(Context)

	const prepareData = data => {
		return Object.keys(data)
			.filter(key => data[key].delegate)
			.map(key => {
				const name = data[key].name || key.charAt(0).toUpperCase() + key.slice(1)
				return {
					key,
					name,
					delegate: data[key].delegate
				}
			})
	}

	let mainnetData = prepareData(projects.mainnet)
	let testnetData = prepareData(projects.testnet)

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Delegate Link',
			dataIndex: 'delegate',
			key: 'delegate',
			render: delegate => (
				<a href={delegate} target='_blank' rel='noopener noreferrer'>
					{delegate}
				</a>
			)
		}
	]

	return (
		<>
			<Head>
				<title>Delegate funds - ITRocket</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<Header />

			<div className='w-full p-1 md:p-6 bg-white dark:bg-zinc-900/40'>
				<div
					className={styles.mainColumn__wrapper}
					style={{ width: '100%', padding: '10px', marginTop: '60px' }}
				>
					<div className={styles.mainColumn}>
						<h1 style={{ paddingTop: '0px' }}>Delegate funds 💸</h1>
						<p className={styles.desc}>
							Here you can find all the latest links to delegate funds to our validator in projects
							supported by ITRocket team.
						</p>
						<br />
						<h2 id='mainnets' style={{ marginTop: '0', paddingTop: '5px' }}>
							Mainnets
						</h2>
						<Table dataSource={mainnetData} columns={columns} pagination={false} bordered />

						<br />
						<h2 style={{ marginTop: '0', paddingTop: '5px' }} id='testnets'>
							Testnets
						</h2>
						<Table dataSource={testnetData} columns={columns} pagination={false} bordered />
					</div>
				</div>
			</div>

			<Footer />
		</>
	)
}

export default About
