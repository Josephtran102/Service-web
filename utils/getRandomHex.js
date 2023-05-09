export const getRandomHex = size => {
	const res = [...Array(size)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join('')
	return res
}
