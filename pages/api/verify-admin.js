import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@utils/auth'
import cookie from 'cookie'

const prisma = new PrismaClient()

export default async function handler(req, res) {
	const cookies = cookie.parse(req.headers.cookie || '')
	const token = cookies['token']

	if (!token) {
		return res.json({ isAdmin: false })
	}

	const user = verifyToken(token)
	const currentUser = await prisma.user.findUnique({ where: { id: user.id } })

	if (currentUser.role !== 'admin') {
		return res.json({ isAdmin: false })
	}

	return res.json({ isAdmin: true })
}
