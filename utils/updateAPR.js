import PocketBase from 'pocketbase'
import { fetchAnnualProvisions, fetchBondedTokens, fetchCommunityTax } from './fetchCosmosEndpoints'
import projects from 'data/projects'

export const updateAPR = () => {
	const pb = new PocketBase('https://pocket.itrocket.net')
	pb.autoCancellation(false)

	// create
	// const record = async data => {
	// 	await pb.collection('apr').create(data)
	// }

	// let projectArr = []

	// Object.keys(projects.mainnet).map(item => projectArr.push(item))
	// projectArr.map(item => {
	// 	const data = {}
	// 	data.name = item
	// 	data.percent = Math.floor(Math.random() * 50) + ' '
	// 	record(data)
	// })

	const fetchData = async () => {
		const records = await pb.collection('apr').getFullList({ sort: '-created' })
		for (const record of records) {
			const apr = await countApr(record.name)
			await pb.collection('apr').update(record.id, { percent: apr })
		}
	}

	fetchData()

	return <></>
}

export const getAprRecords = async () => {
	const pb = new PocketBase('https://pocket.itrocket.net')
	pb.autoCancellation(false)
	const records = await pb.collection('apr').getFullList({ sort: 'name' })
	return records
}

export const countApr = async name => {
	const annual_provisions = await fetchAnnualProvisions(name)
	const community_tax = await fetchCommunityTax(name)
	const bonded_tokens = await fetchBondedTokens(name)
	if (annual_provisions && community_tax && bonded_tokens) {
		const aprValue = ((annual_provisions * (1 - community_tax)) / bonded_tokens) * 100
		const apr = `~${Math.round(aprValue)}%`
		return apr
	} else return `soon`
}
