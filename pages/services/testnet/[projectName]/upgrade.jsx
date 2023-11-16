import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import Upgrade from '@components/Upgrade'
import NamadaUpgrade from '@components/Namada/Upgrade'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const UpgradePage = () => {
	const router = useRouter()
	const { projectName } = router.query

	const UpgradeComponent = projectName === 'namada' ? NamadaUpgrade : Upgrade

	return <UpgradeComponent name={projectName} type='testnet' />
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
