import axios from 'axios'

export const fetchPocketbaseProjects = async () => {
	try {
		const response = await axios.get('/api/pocketbase/get-projects')
		return response.data
	} catch (error) {
		console.log(error)
	}
}
