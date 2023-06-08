import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			role: user.role
		},
		JWT_SECRET,
		{ expiresIn: '7d' }
	)
}

export function verifyToken(token) {
	return jwt.verify(token, JWT_SECRET)
}
