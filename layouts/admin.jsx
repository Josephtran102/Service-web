import Image from 'next/image'
import Link from 'next/link'

import projects from '@data/projects'
import ProjectsModal from '@components/ProjectsModal'

const mainnetData = projects.mainnet
const testnetData = projects.testnet

const AdminLayout = ({ children }) => {
	return (
		<>
			<div className='flex flex-col gap-3'>
				<header className='flex items-center py-1 md:py-3 px-2 lg:px-8 gap-3 lg:gap-16 bg-white dark:bg-zinc-800'>
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
					<Link href='/admin/mainnet/create' className='ml-4 p-1 hover:text-indigo-500'>
						Add Mainnet
					</Link>
					<Link href='/admin/testnet/create' className='ml-4 p-1 hover:text-green-500'>
						Add Testnet
					</Link>
				</header>

				<div className='w-full lg:w-[96%] lg:mx-[2%] border-solid rounded-lg border-[1px] border-slate-200/90 transition-all mt-1 lg:mt-3'>
					<div className='flex gap-1 lg:gap-8 rounded-lg bg-white dark:bg-zinc-900 p-2 lg:px-4'>
						<aside className='border-r-[1px] px-2 md:px-3 min-w-[30px] lg:min-w-[30%] xl:min-w-[28%] 2xl:min-w-[25%]'>
							<div className='justify-between hidden lg:flex gap-2 px-1 '>
								<div>
									<h2 className='font-semibold py-2 lg:text-lg '>Mainnet:</h2>
									<div>
										{Object.keys(mainnetData).map(item => {
											const name =
												mainnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
											const dashboardURL = '/admin/mainnet/' + name.toLowerCase()

											return (
												<Link
													href={dashboardURL}
													className='text-sm p-2 xl:px-4 xl:py-3 flex gap-2 xl:gap-3 border-[1px] border-slate-500/25 hover:border-slate-500/50 rounded-lg mb-3 transition'
													style={{ borderRadius: '8px' }}
													key={name}
												>
													<Image
														src={require('@public/mainnet/'.concat(mainnetData[item].imgUrl))}
														alt='project logo'
														width='22'
														height='22'
													/>
													{name}
												</Link>
											)
										})}
									</div>
								</div>

								<div>
									<h2 className='font-semibold py-2 lg:text-lg'>Testnet:</h2>
									<div>
										{Object.keys(testnetData).map(item => {
											const name =
												testnetData[item].name || item.charAt(0).toUpperCase() + item.slice(1)
											const dashboardURL = '/admin/testnet/' + name.toLowerCase()

											return (
												<Link
													href={dashboardURL}
													className='text-sm p-2 xl:px-4 xl:py-3 flex gap-2 xl:gap-3 border-[1px] border-slate-500/25 hover:border-slate-500/50 rounded-lg mb-3 transition'
													key={name}
													style={{ borderRadius: '8px' }}
												>
													<Image
														src={require('@public/testnet/'.concat(testnetData[item].imgUrl))}
														alt='project logo'
														width='22'
														height='22'
													/>
													{name}
												</Link>
											)
										})}
									</div>
								</div>
							</div>
							<div className='block lg:hidden'>
								<ProjectsModal type='admin' />
							</div>
						</aside>
						<div className='p-2 lg:px-4 xl:px-6 w-full'>{children}</div>
					</div>
				</div>
				<div className='mt-3 min-h-[100px] flex justify-center items-center'>ITRocket © Admin Dashboard</div>
			</div>
		</>
	)
}

export const getAdminLayout = page => <AdminLayout>{page}</AdminLayout>

export default AdminLayout
