export const smoothScroll = (e, targetId) => {
	const targetElement = document.getElementById(targetId)

	console.log(e, targetId)

	if (targetElement) {
		e.preventDefault()
		targetElement.scrollIntoView({ behavior: 'smooth' })
	}
}
