export async function submitData(data) {
	try {
		const response = await fetch('/api/submit_pfb', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const jsonResponse = await response.json()
		return jsonResponse
	} catch (error) {
		console.error(error)
	}
}
