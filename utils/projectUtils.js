import projects from 'data/projects.json'

export const getProjects = type => {
	return Object.entries(projects[type]).map(([id, projectData]) => ({
		id,
		...projectData
	}))
}

export const generateProjectPaths = type => {
	const projectList = getProjects(type)
	const paths = projectList.map(project => ({
		params: { projectName: project.id, type: project.type }
	}))
	return paths
}

export const getFreePort = () => {
	const ports = {}
	let freePort

	Object.keys(projects['mainnet']).map(id => {
		ports[projects['mainnet'][id]?.port] = true
	})
	Object.keys(projects['testnet']).map(id => {
		ports[projects['testnet'][id]?.port] = true
	})

	for (let i = 10; i < 100; i++) {
		if (!Object.hasOwn(ports, `${i}`) && i !== 26) {
			freePort = i
			break
		}
	}

	return freePort
}
