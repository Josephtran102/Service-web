import jwt from 'jsonwebtoken'

export const authenticated = fn => async (req, res) => {
	jwt.verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
		if (!err && decoded) {
			return await fn(req, res)
		}
		res.status(401).json({ message: 'Sorry you are not authenticated' })
	})
}
