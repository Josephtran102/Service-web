import projects from 'data/projects.json'
import { useRouter } from 'next/router'

import CosmosAPI from '@components/API/CosmosAPI'
import NonCosmosAPI from '@components/API/NonCosmosAPI'
import NamadaAPI from '@components/Namada/API'
import { getLayout } from '@layouts/dashboard'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const Project = ({ project }) => {
	const router = useRouter()
	const { projectName } = router.query

	if (projectName === 'namada') {
		return <NamadaAPI name={projectName} type={type} />
	}

	return projects[type][project.id].ecosystem === 'false' ? (
		<NonCosmosAPI name={projectName} type={type} />
	) : (
		<CosmosAPI name={projectName} type={type} />
	)
}

export async function getStaticPaths() {
	const paths = generateProjectPaths(type)
	return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
	const projects = getProjects(type)
	const project = projects.find(p => p.id === params.projectName)
	return { props: { project }, revalidate: 1 }
}

Project.getLayout = getLayout
export default Project
