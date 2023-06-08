import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import { getAdminLayout } from '@layouts/admin'

const type = 'testnet'

const Project = ({ project }) => {
	return <>{project.id}</>
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

Project.getLayout = getAdminLayout
export default Project
