import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Installation from '@components/Installation'
import NamadaInstallation from '@components/Namada/Installation'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const InstallationPage = () => {
	const router = useRouter()
	const { projectName } = router.query

	const InstallationComponent = projectName === 'namada' ? NamadaInstallation : Installation

	return <InstallationComponent name={projectName} type='testnet' />
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
