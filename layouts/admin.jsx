import { Layout, Menu, theme } from 'antd'
import React, { useEffect } from 'react'
import projects from '@data/projects'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import ProjectsModal from '@components/ProjectsModal'
const { Header, Content, Footer, Sider } = Layout

const mainnetData = projects.mainnet
const testnetData = projects.testnet

const AdminLayout = ({ children }) => {
	const router = useRouter()

	const {
		token: { colorBgContainer }
	} = theme.useToken()
	return (
		<>
			<Layout>
				<Header
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
					className='flex gap-4 bg-white dark:bg-zinc-800'
				>
					<Link href='/'>
						<Image
							src='/logo.svg'
							alt='logo'
							width={180}
							height={55}
							priority={true}
							className='block dark:hidden'
						/>
						<Image
							src='/darkLogo.svg'
							alt='logo'
							width={180}
							height={55}
							priority={true}
							className='hidden dark:block'
						/>
					</Link>

					<Link href='/admin/upload' className='ml-4 p-1'>
						Upload Images
					</Link>
					<Link href='/admin/mainnet/create' className='ml-4  p-1'>
						Add Mainnet
					</Link>
					<Link href='/admin/testnet/create' className='ml-4 p-1'>
						Add Testnet
					</Link>
				</Header>
				<Content
					style={{
						padding: '20px 50px'
					}}
				>
					<Layout
						style={{
							padding: '24px 0',
							background: colorBgContainer
						}}
					>
						{' '}
						<Sider
							style={{
								background: colorBgContainer
							}}
							width={300}
							breakpoint='md'
							className='border-r-2 px-3'
						>
							<div className='justify-between hidden lg:flex'>
								<div>
									<h2 className='font-semibold py-3  text-xl '>Mainnet</h2>
									<div>
										{Object.keys(mainnetData).map(item => {
											const name = mainnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
											const dashboardURL = '/admin/mainnet/' + name.toLowerCase()

											return (
												<Link
													href={dashboardURL}
													className='p-2 lg:p-3 flex gap-2 border-2 border-slate-500/12 mb-2'
													style={{ borderRadius: '8px' }}
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
								</div>

								<div>
									<h2 className='font-semibold py-3 text-xl'>Testnet</h2>
									<div>
										{Object.keys(testnetData).map(item => {
											const name = testnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
											const dashboardURL = '/admin/testnet/' + name.toLowerCase()

											return (
												<Link
													href={dashboardURL}
													className='p-2 lg:p-3 flex gap-2 border-2 border-slate-500/12 rounded-lg mb-2'
													key={name}
													style={{ borderRadius: '8px' }}
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
							</div>
							<ProjectsModal type='admin' className='block opacity-100 lg:opacity-0' />
						</Sider>
						<Content
							style={{
								padding: '0 24px',
								minHeight: 280
							}}
						>
							{children}
						</Content>
					</Layout>
				</Content>
				<Footer
					style={{
						textAlign: 'center'
					}}
				>
					ITRocket © Admin Dashboard
				</Footer>
			</Layout>
		</>
	)
}

export const getAdminLayout = page => <AdminLayout>{page}</AdminLayout>

export default AdminLayout
