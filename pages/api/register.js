import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/auth'

const prisma = new PrismaClient()

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
	const existingUser = await prisma.user.findUnique({
		where: { email }
	})

	if (existingUser) {
		return res.status(409).json({ message: 'User already exists' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			role: 'user' // Default role
		}
	})

	const token = generateToken(user)

	return res.status(201).json({ token })
}
