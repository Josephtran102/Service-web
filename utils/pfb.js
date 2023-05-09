export async function submitData() {
	try {
		const response = await fetch('/api/submit_pfb', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				namespace_id: '099a7b6839d79e41',
				data: 'e4e7d71cffad07e1e484ee49733543b6d9046d7deb39371cbd5c98d088098a1aa753370bb6e1f863d934e8b92225c49362c7ce85',
				gas_limit: 80000,
				fee: 2000,
			}),
		})

		const jsonResponse = await response.json()
		console.log(jsonResponse)
	} catch (error) {
		console.error(error)
	}
}
