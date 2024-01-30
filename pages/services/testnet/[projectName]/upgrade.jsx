import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Upgrade from '@components/Upgrade'
import NamadaUpgrade from '@components/Namada/Upgrade'
import NamadaSEUpgrade from '@components/Namada-se/Upgrade' // Importing the Namada-se Upgrade component
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const UpgradePage = () => {
	const router = useRouter()
	const { projectName } = router.query

	// Determine which upgrade component to use based on the projectName
	let UpgradeComponent
	if (projectName === 'namada') {
		UpgradeComponent = NamadaUpgrade
	} else if (projectName === 'namada-se') {
		UpgradeComponent = NamadaSEUpgrade // Handling the 'namada-se' case
	} else {
		UpgradeComponent = Upgrade
	}

	return <UpgradeComponent name={projectName} type={type} />
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
