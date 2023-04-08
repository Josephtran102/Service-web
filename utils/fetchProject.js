import axios from 'axios'

export const fetchStatus = async (name, type) => {
	try {
		const response = await axios.get(
			`https://${name}-${type}-rpc.itrocket.net:443/status`
		)
		return response.data.result
	} catch (err) {
		console.log(err)
	}
}

export const fetchNetInfo = async (name, type) => {
	try {
		const response = await axios.get(
			`https://${name}-${type}-rpc.itrocket.net:443/net_info`
		)
		return response.data.result
	} catch (err) {
		console.log(err)
	}
}

export const fetchSnap = async (name, type) => {
	try {
		const response = await axios.get(
			`https://files.itrocket.net/${type}/${name}/.current_state.json`,
			{
				headers: {
					accept: 'application/json',
				},
			}
		)
		return response.data
	} catch (err) {
		console.log(err)
	}
}

export const fetchVersion = async (name, type) => {
	try {
		const response = await axios.get(
			`https://${name}-${type}-rpc.itrocket.net:443/abci_info`
		)
		return response.data.result.response
	} catch (err) {
		console.log(err)
	}
}
