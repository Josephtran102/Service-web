import { RetweetOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import styles from '@styles/Services.module.scss'
import projects from 'data/projects'

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
			<div className={`${styles.chain__wrapper} bg-zinc-50/80 dark:bg-zinc-800`} onClick={showModal}>
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
					minWidth: '75%'
				}}
			>
				<div className={styles.mainColumn} style={{ border: '0px', boxShadow: 'none' }}>
					<h2 id='mainnets' style={{ marginTop: '0', paddingTop: '5px' }}>
						Mainnet
					</h2>
					<div className={styles.mainnetColumn}>
						{Object.keys(mainnetData).map(item => {
							const name = item.charAt(0).toUpperCase() + item.slice(1)
							const URL =
								type == 'services'
									? '/services/mainnet/' + name.toLowerCase()
									: '/admin/mainnet/' + name.toLowerCase()

							return (
								<Link
									href={URL}
									className={`${styles.chain__wrapper} bg-zinc-50/80 dark:bg-zinc-800`}
									onClick={handleLinkClick}
									key={name}
								>
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
						Testnet
					</h2>
					<div className={styles.testnetColumn}>
						{Object.keys(testnetData).map(item => {
							const name = item.charAt(0).toUpperCase() + item.slice(1)
							const URL =
								type == 'services'
									? '/services/testnet/' + name.toLowerCase()
									: '/admin/testnet/' + name.toLowerCase()

							return (
								<Link
									href={URL}
									className={`${styles.chain__wrapper} bg-zinc-50/80 dark:bg-zinc-800`}
									onClick={handleLinkClick}
									key={name}
								>
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
