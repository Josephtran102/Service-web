import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Upgrade from '@components/Upgrade'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'mainnet'

const UpgradePage = () => {
	const router = useRouter()
	const { projectName } = router.query

	return <Upgrade name={projectName} type='mainnet' />
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

UpgradePage.getLayout = getLayout
export default UpgradePage
