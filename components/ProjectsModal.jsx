import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Modal } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'

import projects from 'data/projects'
import styles from '@styles/Services.module.scss'

const ProjectsModal = ({ name, type }) => {
	const mainnetData = projects.mainnet
	const testnetData = projects.testnet
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleLinkClick = e => {
		e.preventDefault()
		setIsModalOpen(false)
		window.location.replace(e.currentTarget.href)
	}

	return (
		<>
			<div className={styles.chain__wrapper} onClick={showModal}>
				<span className='flex items-center gap-2 md:gap-4 select-none'>
					{type == 'services' && (
						<b className={styles.bold}>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
					)}
					<RetweetOutlined />
				</span>
			</div>
			<Modal
				centered
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{ style: { display: 'none' } }}
				cancelButtonProps={{ style: { display: 'none' } }}
				style={{
					minWidth: '70%'
				}}
			>
				<div className={styles.mainColumn} style={{ border: '0px', boxShadow: 'none' }}>
					<h2 id='mainnets' style={{ marginTop: '0', paddingTop: '5px' }}>
						Mainnets
					</h2>
					<div className={styles.mainnetColumn}>
						{Object.keys(mainnetData).map(item => {
							const name = item.charAt(0).toUpperCase() + item.slice(1)
							const URL =
								type == 'services'
									? '/services/mainnet/' + name.toLowerCase()
									: '/admin/mainnet/' + name.toLowerCase()

							return (
								<Link href={URL} className={styles.chain__wrapper} onClick={handleLinkClick} key={name}>
									<Image
										src={require('@public/mainnet/'.concat(mainnetData[item].imgUrl))}
										alt='project logo'
										width='25'
										height='25'
									/>
									{name}
								</Link>
							)
						})}
					</div>
					<br />
					<h2 style={{ marginTop: '0', paddingTop: '5px' }} id='testnets'>
						Testnets
					</h2>
					<div className={styles.testnetColumn}>
						{Object.keys(testnetData).map(item => {
							const name = item.charAt(0).toUpperCase() + item.slice(1)
							const URL =
								type == 'services'
									? '/services/testnet/' + name.toLowerCase()
									: '/admin/testnet/' + name.toLowerCase()

							return (
								<Link href={URL} className={styles.chain__wrapper} onClick={handleLinkClick} key={name}>
									<Image
										src={require('@public/testnet/'.concat(testnetData[item].imgUrl))}
										alt='project logo'
										width='25'
										height='25'
									/>
									{name}
								</Link>
							)
						})}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default ProjectsModal
