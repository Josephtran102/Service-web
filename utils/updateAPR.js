import { fetchAnnualProvisions, fetchBondedTokens, fetchCommunityTax } from './fetchCosmosEndpoints'

export const countApr = async name => {
	try {
		const annual_provisions = await fetchAnnualProvisions(name)
		const community_tax = await fetchCommunityTax(name)
		const bonded_tokens = await fetchBondedTokens(name)

		if (annual_provisions && community_tax && bonded_tokens) {
			const aprValue = ((annual_provisions * (1 - community_tax)) / bonded_tokens) * 100
			const apr = `~${Math.round(aprValue)}%`
			return apr
		} else return `soon`
	} catch (err) {
		console.error(err)
		return `soon`
	}
}
