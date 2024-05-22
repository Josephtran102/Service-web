import { useRouter } from 'next/router'

import BridgeNode from '@components/Celestia/testnet/BridgeNode'
import { getLayout } from '@layouts/dashboard'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'
import FourOhFour from 'pages/_error'

const type = 'testnet'

const Project = ({ project }) => {
	const router = useRouter()
	const { projectName } = router.query

	if (projectName !== 'celestia') {
		return <FourOhFour />
	}

	return <BridgeNode />
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
