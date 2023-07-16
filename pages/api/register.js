import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/auth'
import prismadb from '@utils/prismadb'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { email, password } = req.body

	// Check if email or password is empty
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' })
	}

	// Check if user exists
	const existingUser = await prismadb.user.findUnique({
		where: { email }
	})

	if (existingUser) {
		return res.status(409).json({ message: 'User already exists' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prismadb.user.create({
		data: {
			email,
			password: hashedPassword,
			role: 'user'
		}
	})

	const token = generateToken(user)

	return res.status(201).json({ token })
}
