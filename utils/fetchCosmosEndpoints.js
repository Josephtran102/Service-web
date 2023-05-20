import axios from 'axios'

export const fetchAnnualProvisions = async name => {
	const res = await axios
		.get(`https://${name}-mainnet-api.itrocket.net/cosmos/mint/v1beta1/annual_provisions`)
		.catch(err => console.log(err))
	const annual_provisions = res?.data?.annual_provisions
	return annual_provisions
}

export const fetchCommunityTax = async name => {
	const res = await axios
		.get(`https://${name}-mainnet-api.itrocket.net/cosmos/distribution/v1beta1/params`)
		.catch(err => console.log(err))
	const community_tax = res?.data?.params?.community_tax
	return community_tax
}

export const fetchBondedTokens = async name => {
	const res = await axios
		.get(`https://${name}-mainnet-api.itrocket.net/cosmos/staking/v1beta1/pool`)
		.catch(err => console.log(err))
	const bonded_tokens = res?.data?.pool?.bonded_tokens
	return bonded_tokens
}
