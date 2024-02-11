import { Table } from 'antd'
import Head from 'next/head'

import Footer from '@components/Footer'
import Header from '@components/Header'
import styles from '@styles/Services.module.scss'
import projects from 'data/projects'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const About = () => {
	const [opacity, setOpacity] = useState(0)

	const prepareData = (data, type) => {
		return Object.keys(data).map(key => {
			const project = data[key]
			const name = project.name || key.charAt(0).toUpperCase() + key.slice(1)
			const delegate = project.delegate || ''
			const imgUrl = project.imgUrl

			return {
				key,
				name,
				delegate,
				imgUrl,
				type
			}
		})
	}

	let mainnetData = prepareData(projects.mainnet, 'mainnet')
	let testnetData = prepareData(projects.testnet, 'testnet')
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => {
				const imgUrl = `/${record.type}/${record.imgUrl}`
				return (
					<div className='flex items-center'>
						<Image src={imgUrl} alt='project logo' width='25' height='25' />
						<span className='ml-2 w-24 md:w-32'>{text}</span>
					</div>
				)
			}
		},

		{
			title: 'Delegate Link',
			dataIndex: 'delegate',
			key: 'delegate',
			render: delegate =>
				delegate ? (
					<a href={delegate} target='_blank' rel='noopener noreferrer'>
						{delegate}
					</a>
				) : (
					<span>Not supported yet</span>
				)
		}
	]

	useEffect(() => {
		setTimeout(() => {
			setOpacity(1)
		}, 1)
	}, [])

	return (
		<>
			<Head>
				<title>Delegate funds - ITRocket</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<Header />

			<div className='w-full p-1 md:p-6 bg-white dark:bg-zinc-900/40' style={{ opacity: opacity }}>
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
							Mainnet
						</h2>
						<Table dataSource={mainnetData} columns={columns} pagination={false} bordered />

						<br />
						<h2 style={{ marginTop: '0', paddingTop: '5px' }} id='testnets'>
							Testnet
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
