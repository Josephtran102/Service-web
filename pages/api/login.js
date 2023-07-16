import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/auth'
import prismadb from '@utils/prismadb'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' })
	}

	const user = await prismadb.user.findUnique({
		where: { email }
	})

	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		return res.status(400).json({ message: 'Invalid credentials' })
	}

	const token = generateToken(user)

	return res.status(200).json({ token })
}
