import { getAdminLayout } from '@layouts/admin'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@utils/auth'
import cookie from 'cookie'

const prisma = new PrismaClient()

const Admin = () => {
	;<>
		<p>Choose project</p>
	</>
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

Admin.getLayout = getAdminLayout
export default Admin
