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

	// Check if admin exists
	const existingAdmin = await prisma.user.findFirst({
		where: {
			role: 'admin'
		}
	})

	if (existingAdmin) {
		return res.status(409).json({ message: 'Admin already exists' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const admin = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			role: 'admin'
		}
	})

	const token = generateToken(admin)

	return res.status(201).json({ token })
}
