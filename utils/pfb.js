import axios from 'axios'

const data = {
	namespace_id: '099a7b6839d79e41',
	data: 'e4e7d71cffad07e1e484ee49733543b6d9046d7deb39371cbd5c98d088098a1aa753370bb6e1f863d934e8b92225c49362c7ce85',
	gas_limit: 80000,
	fee: 2000,
}

export const submitPFB = async () => {
	const config = {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}

	axios
		.post('http://195.201.197.4:26659/submit_pfb', data, config)
		.then(response => {
			console.log(response.data)
		})
		.catch(error => {
			console.log(error)
		})
}
