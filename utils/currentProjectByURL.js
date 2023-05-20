import projects from 'data/projects'

export const currentProject = () => {
	if (typeof window === 'undefined') {
		return { error: 'Window object is not available' }
	}

	const URL = window.location.href
	let name = ''
	let type = URL.indexOf('testnet') > -1 ? 'testnet' : 'mainnet'

	type === 'testnet'
		? Object.keys(projects.testnet).map(item => (URL.indexOf(item) > -1 ? (name = item) : null))
		: Object.keys(projects.mainnet).map(item => (URL.indexOf(item) > -1 ? (name = item) : null))

	const serviceURL = `/services/${type}/` + name.toLowerCase()
	const chainID = projects[type][name].chainID

	return { name: name, type: type, serviceURL: serviceURL, chainID: chainID }
}
