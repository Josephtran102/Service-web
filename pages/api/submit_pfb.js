import fetch from 'node-fetch'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { namespace_id, data, gas_limit, fee } = req.body

		try {
			const response = await fetch(
				'https://pfb-celestia-testnet.itrocket.net/submit_pfb',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						namespace_id,
						data,
						gas_limit,
						fee,
					}),
				}
			)

			const jsonResponse = await response.json()
			res.status(200).json(jsonResponse)
		} catch (error) {
			console.error(error)
			res.status(500).json({
				message: 'An error occurred while executing the CURL command.',
			})
		}
	} else {
		res.status(405).json({ message: 'Method not allowed.' })
	}
}
