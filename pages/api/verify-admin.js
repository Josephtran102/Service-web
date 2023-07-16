import { verifyToken } from '@utils/auth'
import prismadb from '@utils/prismadb'
import cookie from 'cookie'

export default async function handler(req, res) {
	const cookies = cookie.parse(req.headers.cookie || '')
	const token = cookies['token']

	if (!token) {
		return res.json({ isAdmin: false })
	}

	const user = verifyToken(token)
	const currentUser = await prismadb.user.findUnique({ where: { id: user.id } })

	if (currentUser.role !== 'admin') {
		return res.json({ isAdmin: false })
	}

	return res.json({ isAdmin: true })
}
