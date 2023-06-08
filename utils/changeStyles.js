export const changeStyles = theme => {
	const body = document.body

	const isLight = theme === 'light'

	body.style.backgroundColor = isLight ? '#F8F9FA' : '#171717'
	body.style.color = isLight ? '#000' : 'rgb(241, 245, 249)'
	body.style.colorScheme = isLight ? 'light' : 'dark'

	isLight
		? document.documentElement.classList.remove('dark')
		: document.documentElement.classList.add('dark')
}
