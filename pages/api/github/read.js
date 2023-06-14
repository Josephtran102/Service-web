import axios from 'axios'

export default async function handler(req, res) {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.jsx`, {
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`
			}
		})
		const data = response.data
		const currentContent = Buffer.from(data.content, 'base64').toString('utf8')

		res.status(200).json(currentContent)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching projects' })
	}
}
