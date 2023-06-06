import axios from 'axios'
import fetch from 'node-fetch'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { namespace_id, data, gas_limit, fee, captcha } = req.body

		console.log('POST request received with:', req.body)

		const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
		const response = await axios.post(recaptchaUrl)
		const recaptchaValidation = response.data

		if (!recaptchaValidation.success || recaptchaValidation.score < 0.5) {
			return res.status(400).json({ message: 'reCAPTCHA validation failed.' })
		}

		try {
			const response = await fetch('https://pfb-celestia-testnet.itrocket.net/submit_pfb', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					namespace_id,
					data,
					gas_limit,
					fee
				})
			})

			const jsonResponse = await response.json()
			res.status(200).json(jsonResponse)
		} catch (error) {
			console.error(error)
			res.status(500).json({
				message: 'An error occurred while executing the CURL command.'
			})
		}
	} else {
		res.status(405).json({ message: 'Method not allowed.' })
	}
}
