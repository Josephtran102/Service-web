import { useEffect, useState } from 'react'
import prettyMilliseconds from 'pretty-ms'

import { fetchSnap } from '@utils/fetchProject'

const useFetchSnapInfo = (name, type) => {
	const [snapHeight, setSnapHeight] = useState(null)
	const [snapSize, setSnapSize] = useState('')
	const [snapTime, setSnapTime] = useState()
	const [pruning, setPruning] = useState('')
	const [indexer, setIndexer] = useState(null)
	const [wasmPath, setWasmPath] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchSnap(name, type)

				setSnapHeight(data.SnapshotHeight)
				setSnapSize(data.SnapshotSize)
				setPruning(data.pruning)
				setIndexer(data.indexer)
				setWasmPath(data.WasmPath)

				let snapTime = data.SnapshotBlockTime
				snapTime = Date.parse(snapTime.concat(':00'))
				snapTime = Date.now() - snapTime
				setSnapTime(prettyMilliseconds(snapTime, { compact: true }))
			} catch (err) {
				console.log(err)
			}
		}

		fetchData()
		const intervalId = setInterval(fetchData, 10000)

		return () => {
			clearInterval(intervalId)
		}
	}, [name, type])

	return { snapHeight, snapSize, snapTime, pruning, indexer, wasmPath }
}

export default useFetchSnapInfo
