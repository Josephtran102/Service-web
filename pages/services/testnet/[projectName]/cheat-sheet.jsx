import { useRouter } from 'next/router'
import { getLayout } from '@layouts/dashboard'
import CheatSheet from '@components/CheatSheet'
import NamadaCheatSheet from '@components/Namada/CheatSheet'
import { generateProjectPaths, getProjects } from '@utils/projectUtils'

const type = 'testnet'

const CheatSheetPage = () => {
	const router = useRouter()
	const { projectName } = router.query

	const CheatSheetComponent = projectName === 'namada' ? NamadaCheatSheet : CheatSheet

	return <CheatSheetComponent name={projectName} type='testnet' />
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

CheatSheetPage.getLayout = getLayout
export default CheatSheetPage
