import { verifyToken } from '@utils/auth'
import prismadb from '@utils/prismadb'
import cookie from 'cookie'

async function isAdmin(req, res, next) {
	const cookies = cookie.parse(req.headers.cookie || '')
	const token = cookies['token']

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized: No token provided' })
	}

	try {
		const user = verifyToken(token)
		const currentUser = await prismadb.user.findUnique({ where: { id: user.id } })

		if (currentUser && currentUser.role === 'admin') {
			req.user = currentUser
			next()
		} else {
			return res.status(403).json({ error: 'Forbidden: User is not an admin' })
		}
	} catch (err) {
		console.error('Authentication error', err)
		return res.status(401).json({ error: 'Invalid token or user not found' })
	}
}

export default isAdmin
