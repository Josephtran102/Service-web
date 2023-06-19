import { getAdminLayout } from '@layouts/admin'
import { UploadOutlined } from '@ant-design/icons'

const UploadComponent = () => {
	return (
		<div className='flex flex-col gap-5'>
			<a
				href='https://github.com/itrocket-am/itrocket/upload/main/public/mainnet'
				target='_blank'
				rel='noopener noreferrer'
				className='text-lg flex gap-2'
			>
				<span className='text-sky-500'>
					<UploadOutlined />
				</span>
				Upload image to<span className='text-indigo-500'>mainnet</span> folder
			</a>
			<a
				href='https://github.com/itrocket-am/itrocket/upload/main/public/testnet'
				target='_blank'
				rel='noopener noreferrer'
				className='text-lg flex gap-2'
			>
				<span className='text-sky-500'>
					<UploadOutlined />
				</span>
				Upload image to <span className='text-green-500'>testnet</span> folder
			</a>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const { req } = context
		const cookies = cookie.parse(req.headers.cookie || '')
		const token = cookies['token']

		if (!token) {
			console.log('no token')
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			}
		}

		const user = verifyToken(token)
		const currentUser = await prisma.user.findUnique({
			where: { id: user.id }
		})

		if (currentUser.role !== 'admin') {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		return {
			props: {}
		}
	} catch (err) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
}

UploadComponent.getLayout = getAdminLayout

export default UploadComponent
