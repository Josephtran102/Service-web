import { useState, useEffect } from 'react'

import { fetchNetInfo } from '@utils/fetchProject'

const useNetInfo = (name, type) => {
	const [livePeers, setLivePeers] = useState('')
	const [livePeersCounter, setLivePeersCounter] = useState(0)

	useEffect(() => {
		const fetchData = () => {
			const livePeers = []

			fetchNetInfo(name, type)
				.then(info => {
					const peers = info.peers
					const letters = /[a-zA-Z]/

					peers.map(peer => {
						if (peer.is_outbound === true) {
							let ip = peer.remote_ip
							const id = peer.node_info.id
							const listen_addr = peer.node_info.listen_addr

							if (letters.test(ip)) {
								ip = `[${ip}]`
							}

							let i = listen_addr.length - 1
							let port = ''

							while (listen_addr[i] !== ':') {
								port += listen_addr[i]
								i--
							}

							port = port.split('').reverse().join('')
							livePeers.push(`${id}@${ip}:${port}`)
						}
					})

					livePeers.unshift('')
					setLivePeersCounter(livePeers.length)
					setLivePeers(livePeers.join())
				})
				.catch(err => {
					console.log(err)
				})
		}

		fetchData()
		const intervalId = setInterval(fetchData, 10000)

		return () => {
			clearInterval(intervalId)
		}
	}, [name, type])

	return { livePeers, livePeersCounter }
}

export default useNetInfo
