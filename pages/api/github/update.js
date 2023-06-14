import axios from 'axios'

export default async function handler(req, res) {
	try {
		const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.jsx`, {
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`
			}
		})
		const currentSHA = getResponse.data.sha
		const currentContent = Buffer.from(getResponse.data.content, 'base64').toString('utf8')

		const updatedContent = `${currentContent}\n//123`

		const putResponse = await axios.put(
			`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.jsx`,
			{
				message: 'Commit message',
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
		res.status(500).json({ error: 'Error updating file' })
	}
}
