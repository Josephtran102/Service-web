require('dotenv').config()
import { pb } from 'lib/pocketbase'

export default async function handler(req, res) {
	const email = process.env.PB_EMAIL
	const password = process.env.PB_PASSWORD

	pb.autoCancellation(false)
	try {
		await pb.admins.authWithPassword(email, password)
	} catch (error) {
		console.log('Error:', error)
		return res.status(500).json({ error: 'Error logging in' })
	}

	try {
		const mainnet = await pb.collection('projects_main').getFullList({
			sort: 'name'
		})
		const testnet = await pb.collection('projects_test').getFullList({
			sort: 'name'
		})
		return res.status(200).send({ mainnet, testnet })
	} catch (error) {
		console.log('Error fetching data:', error)
		return res.status(500).json({ error: 'Error fetching data' })
	}
}
