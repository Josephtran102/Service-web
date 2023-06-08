import { getAdminLayout } from '@layouts/admin'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@utils/auth'

const prisma = new PrismaClient()

export async function getServerSideProps(context) {
	try {
		const { req } = context
		const token = req.headers.cookie?.split('=')[1]

		if (!token) {
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
			props: {} // Will be passed to the page component as props
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
