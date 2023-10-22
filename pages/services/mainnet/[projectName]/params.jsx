import axios from 'axios'
import { getLayout } from '@layouts/dashboard'
import Params from '@components/Params'

const ParamsPage = ({ paramsData }) => {
	const type = 'mainnet'

	return (
		<>
			<Params paramsData={paramsData} />
			{paramsData && <a href={`https://t.me/itrocket_${type}_proposal_bot`}>Go to Telegram Bot</a>}
		</>
	)
}

export async function getServerSideProps(context) {
	const { projectName } = context.params
	let paramsData = null

	if (projectName === 'cardchain') {
		try {
			const response = await axios.get(
				'https://cardchain-testnet-api.itrocket.net/DecentralCardGame/Cardchain/cardchain/params'
			)
			paramsData = response.data
		} catch (error) {
			console.error('An error occurred while fetching params data:', error)
			paramsData = null
		}
	}

	return {
		props: {
			paramsData
		}
	}
}

ParamsPage.getLayout = getLayout

export default ParamsPage
