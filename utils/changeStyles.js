export const changeStyles = theme => {
	const body = document.body
	const antTypography = document.getElementsByClassName('ant-typography')
	const antMenuLight = document.getElementsByClassName('ant-menu-light')
	const active = document.querySelector(`div[aria-expanded='true']`)
	const isLight = theme === 'light'

	body.style.backgroundColor = isLight ? '#fefefe' : '#171717'
	body.style.color = isLight ? '#000' : '#fff'

	for (const el of antMenuLight) {
		if (el) {
			el.classList.toggle('ant-menu-dark', !isLight)
		}
	}

	if (active) {
		active.style.backgroundColor = isLight ? '#dbeafe' : '#030329'
	}

	for (const el of antTypography) {
		if (el) {
			el.style.color = isLight ? '#000' : '#fff'
		}
	}
}
