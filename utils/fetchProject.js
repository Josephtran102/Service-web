export const fetchStatus = async (name, type) => {
	const response = await fetch(
		`https://${name}-${type}-rpc.itrocket.net:443/status`
	).catch(err => {
		console.log(err)
	})
	const data = await response.json()
	const status = await data.result

	return status
}

export const fetchNetInfo = async (name, type) => {
	const response = await fetch(
		`https://${name}-${type}-rpc.itrocket.net:443/net_info`
	).catch(err => {
		console.log(err)
	})
	const data = await response.json()
	const info = await data.result

	return info
}

export const fetchSnap = async (name, type) => {
	const response = await fetch(
		`https://files.itrocket.net/${type}/${name}/.current_state.json`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		}
	).catch(err => {
		console.log(err)
	})
	const data = await response.json()

	return data
}

export const fetchVersion = async (name, type) => {
	const response = await fetch(
		`https://${name}-${type}-rpc.itrocket.net:443/abci_info?`
	).catch(err => {
		console.log(err)
	})
	const data = await response.json()
	const info = await data.result

	return info.response
}
