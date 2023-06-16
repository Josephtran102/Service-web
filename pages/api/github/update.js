export default async function handler(req, res) {
	try {
		const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.json`, {
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`
			}
		})
		const currentSHA = getResponse.data.sha
		const requestBody = req.body // assuming JSON data sent with request is in req.body

		// Convert JSON object to string
		const updatedContent = JSON.stringify(requestBody, null, 2) // 2 is used for pretty printing

		const putResponse = await axios.put(
			`${process.env.NEXT_PUBLIC_GITHUB_LINK}/contents/data/projects.json`,
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
