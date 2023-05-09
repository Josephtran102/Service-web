import PocketBase from 'pocketbase'
import { useEffect } from 'react'
import projects from '@store/projects'

export const updateAPR = () => {
	const pb = new PocketBase('https://pocket.itrocket.net')
	pb.autoCancellation(false)

	const record = async data => {
		await pb.collection('apr').create(data)
	}

	const fetchData = async () => {
		const response = await fetch(
			'https://pocket.itrocket.net/api/collections/apr/records'
		)
		const data = await response.json()
		// console.log(data.items)
	}

	const projectArr = fetchData()
	// console.log(projectArr)

	return <></>
}
