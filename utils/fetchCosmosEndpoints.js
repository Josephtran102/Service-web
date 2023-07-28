import axios from 'axios'
import projects from '@data/projects.json'

const notImplemented = ['quicksilver', 'realio']

const isNotCosmos = name => {
	if (projects['mainnet'][name].ecosystem !== 'cosmos' || notImplemented.indexOf(name) > -1) {
		return true
	}
	return false
}

export const fetchAnnualProvisions = async name => {
	if (isNotCosmos(name)) {
		return null
	} else {
		try {
			const res = await axios.get(
				`https://${name}-mainnet-api.itrocket.net/cosmos/mint/v1beta1/annual_provisions`
			)
			return res?.data?.annual_provisions
		} catch (err) {
			return null
		}
	}
}

export const fetchCommunityTax = async name => {
	if (isNotCosmos(name)) return null
	try {
		const res = await axios.get(`https://${name}-mainnet-api.itrocket.net/cosmos/distribution/v1beta1/params`)
		return res?.data?.params?.community_tax
	} catch (err) {
		return null
	}
}

export const fetchBondedTokens = async name => {
	if (isNotCosmos(name)) return null
	try {
		const res = await axios.get(`https://${name}-mainnet-api.itrocket.net/cosmos/staking/v1beta1/pool`)
		return res?.data?.pool?.bonded_tokens
	} catch (err) {
		return null
	}
}
