export const smoothScroll = (event, targetId) => {
	const targetElement = document.getElementById(targetId)

	if (targetElement) {
		event.preventDefault()
		targetElement.scrollIntoView({ behavior: 'smooth' })
	}
}
