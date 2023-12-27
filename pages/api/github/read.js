import axios from 'axios'
import isAdmin from 'middleware/admin'

export default async function handler(req, res) {
	isAdmin(req, res, async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.json`, {
				headers: {
					Authorization: `token ${process.env.GITHUB_TOKEN}`
				}
			})
			const data = response.data
			const currentContent = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'))

			res.status(200).json(currentContent)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Error fetching projects' })
		}
	})
}
