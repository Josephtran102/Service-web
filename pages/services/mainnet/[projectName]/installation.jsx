import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Installation from '@components/Installation'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'mainnet'

const InstallationPage = () => {
	const router = useRouter()
	const { projectName } = router.query

	return <Installation name={projectName} type='mainnet' />
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

InstallationPage.getLayout = getLayout
export default InstallationPage
