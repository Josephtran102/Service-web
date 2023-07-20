import { useEffect, useState } from 'react'

import { fetchStatus } from '@utils/fetchProject'

const useStatus = (name, type) => {
	const [blockHeight, setBlockHeight] = useState(null)
	const [isActive, setIsActive] = useState(null)

	useEffect(() => {
		const fetchData = () => {
			fetchStatus(name, type)
				.then(status => {
					if (isCurrent) {
						setBlockHeight(status.sync_info.latest_block_height)
						setIsActive('active')

						if (callback) callback(status.sync_info.latest_block_height, 'active')
					}
				})
				.catch(err => {
					if (isCurrent) {
						console.log(err)
						setIsActive('inactive')

						if (callback) callback(null, 'inactive')
					}
				})
		}

		fetchData()
		const intervalId = setInterval(fetchData, 10000)

		return () => {
			clearInterval(intervalId)
		}
	}, [name, type])

	return { blockHeight, isActive, getStatus }
}

export default useStatus
