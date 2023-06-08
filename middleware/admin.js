import { verifyToken } from '../utils/auth'

function isAdmin(req, res, next) {
	const token = req.headers.authorization
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	try {
		const user = verifyToken(token)
		if (user.role !== 'admin') {
			return res.status(403).json({ error: 'Forbidden' })
		}
		req.user = user
		next()
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' })
	}
}

export default isAdmin
