import { getAdminLayout } from '@layouts/admin'
import { verifyToken } from '@utils/auth'
import prismadb from '@utils/prismadb'
import cookie from 'cookie'

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
		const currentUser = await prismadb.user.findUnique({
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
