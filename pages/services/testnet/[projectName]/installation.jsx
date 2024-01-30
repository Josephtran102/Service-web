import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Installation from '@components/Installation'
import NamadaInstallation from '@components/Namada/Installation'
import NamadaSEInstallation from '@components/Namada-se/Installation' // Importing the Namada-se Installation component
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const InstallationPage = () => {
	const router = useRouter()
	const { projectName } = router.query

	// Determine which installation component to use based on the projectName
	let InstallationComponent
	if (projectName === 'namada') {
		InstallationComponent = NamadaInstallation
	} else if (projectName === 'namada-se') {
		InstallationComponent = NamadaSEInstallation // Handling the 'namada-se' case
	} else {
		InstallationComponent = Installation
	}

	return <InstallationComponent name={projectName} type={type} />
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
