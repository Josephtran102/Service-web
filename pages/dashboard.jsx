import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import React from 'react'
import projects from '@data/projects'
import Image from 'next/image'
import Link from 'next/link'
const { Header, Content, Footer, Sider } = Layout
const items1 = ['1', '2', '3'].map(key => ({
	key,
	label: `nav ${key}`
}))
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
	const key = String(index + 1)
	return {
		key: `sub${key}`,
		icon: React.createElement(icon),
		label: `subnav ${key}`,
		children: new Array(4).fill(null).map((_, j) => {
			const subKey = index * 4 + j + 1
			return {
				key: subKey,
				label: `option${subKey}`
			}
		})
	}
})

const mainnetData = projects.mainnet
const testnetData = projects.testnet

const Dashboard = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	return (
		<Layout>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<div className='demo-logo' />
				<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} />
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
					<Sider
						style={{
							background: colorBgContainer
						}}
						width={320}
						className='border-r-2 px-3'
					>
						<div className='flex gap-5'>
							<div>
								<h2 id='mainnets' className='font-bold my-2 text-xl'>
									Mainnets
								</h2>
								<div>
									{Object.keys(mainnetData).map(item => {
										const name =
											mainnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
										const dashboardURL = '/dashboard/mainnet/' + name.toLowerCase()

										return (
											<Link
												href={dashboardURL}
												className='p-2 flex gap-2 border-2 border-slate-500/12 rounded-lg mb-2'
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
								<h2 className='font-bold my-2 text-xl' id='testnets'>
									Testnets
								</h2>
								<div>
									{Object.keys(testnetData).map(item => {
										const name =
											testnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
										const dashboardURL = '/dashboard/testnet/' + name.toLowerCase()

										return (
											<Link
												href={dashboardURL}
												className='p-2 flex gap-2 border-2 border-slate-500/12 rounded-lg mb-2'
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
						</div>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280
						}}
					></Content>
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
	)
}
export default Dashboard
