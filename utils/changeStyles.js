export const changeStyles = theme => {
	const body = document.body
	const antTypography = document.getElementsByClassName('ant-typography')
	const antMenuLight = document.getElementsByClassName('ant-menu-light')
	const input = document.getElementsByClassName('ant-input')
	const submenu = document.getElementsByClassName('ant-menu-submenu-title')
	const radio = document.getElementsByClassName('ant-radio-button-wrapper')
	const links = document.querySelectorAll('ant-menu-title-content > a')
	const isLight = theme === 'light'

	body.style.backgroundColor = isLight ? '#F8F9FA' : '#171717'
	body.style.color = isLight ? '#000' : 'rgb(241, 245, 249)'
	body.style.colorScheme = isLight ? 'light' : 'dark'

	for (const el of antMenuLight) {
		if (el) {
			el.classList.toggle('ant-menu-dark', !isLight)
		}
	}
	for (const el of submenu) {
		if (el) {
			el.style.backgroundColor = isLight ? '#F0F0F0' : '#222222'
		}
	}
	for (const el of radio) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#d5d5d5'
		}
	}
	for (const el of antTypography) {
		if (el) {
			el.style.color = isLight ? '#000' : '#fff'
		}
	}
	// for (const el of links) {
	// 	if (el) {
	// 		isLight ? el.classList.add('dark') : el.classList.remove('dark')
	// 	}
	// }
	isLight
		? document.documentElement.classList.remove('dark')
		: document.documentElement.classList.add('dark')
	for (const el of input) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#ffffffef'
		}
	}
}
