export const changeStyles = theme => {
	const body = document.body

	const isLight = theme === 'light'

	body.style.backgroundColor = isLight ? '#F7F7F7' : '#181818'
	body.style.color = isLight ? '#000' : 'rgb(241, 245, 249)'
	body.style.colorScheme = isLight ? 'light' : 'dark'

	isLight ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
}
