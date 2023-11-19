// [projectName].js
import Head from 'next/head'
import axios from 'axios'

import PublicRPC from '@components/PublicRPC'
import { getLayout } from '@layouts/dashboard'

const ProjectPage = ({ data, projectName }) => {
	const type = 'mainnet'

	return (
		<>
			<Head>
				<title>Public RPC - ITRocket</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>
			<PublicRPC data={data} projectName={projectName} type={type} />
		</>
	)
}

export async function getServerSideProps(context) {
	const projectName = context.params.projectName
	const type = 'mainnet'
	try {
		const response = await axios.get(`https://${type}-files.itrocket.net/${projectName}/.rpc_combined.json`)
		return {
			props: {
				data: response.data,
				projectName: projectName
			}
		}
	} catch (error) {
		console.error('An error occurred while fetching data:', error)
		return {
			props: { data: {}, projectName: projectName }
		}
	}
}

ProjectPage.getLayout = getLayout
export default ProjectPage
