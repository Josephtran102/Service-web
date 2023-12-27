import axios from 'axios'
import isAdmin from 'middleware/admin'

export default async function handler(req, res) {
	isAdmin(req, res, async () => {
		try {
			const getResponse = await axios.get(
				`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.json`,
				{
					headers: {
						Authorization: `token ${process.env.GITHUB_TOKEN}`
					}
				}
			)
			const currentSHA = getResponse.data.sha
			const requestBody = req.body

			const updatedContent = JSON.stringify(requestBody, null, 2)

			const putResponse = await axios.put(
				`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.json`,
				{
					message: 'update: cfg using API',
					content: Buffer.from(updatedContent).toString('base64'),
					sha: currentSHA
				},
				{
					headers: {
						Authorization: `token ${process.env.GITHUB_TOKEN}`,
						'Content-Type': 'application/json'
					}
				}
			)

			res.status(200).json(putResponse.data)
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Error updating file' })
		}
	})
}
