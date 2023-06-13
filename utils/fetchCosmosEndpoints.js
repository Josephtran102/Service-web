import axios from 'axios'

export const fetchAnnualProvisions = async name => {
	try {
		const res = await axios.get(`https://${name}-mainnet-api.itrocket.net/cosmos/mint/v1beta1/annual_provisions`)
		return res?.data?.annual_provisions
	} catch (err) {
		console.log(err)
		return null
	}
}

export const fetchCommunityTax = async name => {
	try {
		const res = await axios.get(`https://${name}-mainnet-api.itrocket.net/cosmos/distribution/v1beta1/params`)
		return res?.data?.params?.community_tax
	} catch (err) {
		console.log(err)
		return null
	}
}

export const fetchBondedTokens = async name => {
	try {
		const res = await axios.get(`https://${name}-mainnet-api.itrocket.net/cosmos/staking/v1beta1/pool`)
		return res?.data?.pool?.bonded_tokens
	} catch (err) {
		console.log(err)
		return null
	}
}
