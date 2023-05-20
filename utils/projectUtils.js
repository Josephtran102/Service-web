import projects from 'data/projects'

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
