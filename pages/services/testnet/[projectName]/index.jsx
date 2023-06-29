import { getLayout } from '@layouts/dashboard'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import CosmosAPI from '@components/API/CosmosAPI'
import NonCosmosAPI from '@components/API/NonCosmosAPI'

const type = 'testnet'

const Project = ({ project }) => {
	return project.ecosystem == 'false' ? (
		<NonCosmosAPI name={project.id} type={type} />
	) : (
		<CosmosAPI name={project.id} type={type} />
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
