import { getAdminLayout } from '@layouts/admin'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@utils/auth'
import cookie from 'cookie'

const prisma = new PrismaClient()

export async function getServerSideProps(context) {
	try {
		const { req } = context
		const cookies = cookie.parse(req.headers.cookie || '')
		const token = cookies['token']

		if (!token) {
			console.log('not token')
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
			console.log('not admin role')
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

const Admin = () => {
	;<>123</>
}

Admin.getLayout = getAdminLayout
export default Admin
