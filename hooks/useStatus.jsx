import { fetchStatus } from '@utils/fetchProject'
import { useEffect, useState } from 'react'

const useStatus = () => {
	const [blockHeight, setBlockHeight] = useState(null)
	const [isActive, setIsActive] = useState(null)

	const getStatus = (name, type, isCurrent, callback) => {
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

	return { blockHeight, isActive, getStatus }
}

export default useStatus
