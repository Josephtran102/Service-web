export const changeStyles = theme => {
	const body = document.body
	const antTypography = document.getElementsByClassName('ant-typography')
	const antMenuLight = document.getElementsByClassName('ant-menu-light')
	const segmented = document.getElementsByClassName('ant-segmented')
	const input = document.getElementsByClassName('ant-input')
	const radio = document.getElementsByClassName('ant-radio-button-wrapper')
	const active = document.querySelector(`div[aria-expanded='true']`)
	const isLight = theme === 'light'

	body.style.backgroundColor = isLight ? '#fbfbfb' : '#171717'
	body.style.color = isLight ? '#000' : '#fff'
	body.style.colorScheme = isLight ? 'light' : 'dark'

	for (const el of antMenuLight) {
		if (el) {
			el.classList.toggle('ant-menu-dark', !isLight)
		}
	}

	for (const el of segmented) {
		if (el) {
			el.style.backgroundColor = isLight ? '#e0e0e0' : '#6b6969'
		}
	}
	for (const el of input) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#d5d5d5'
		}
	}
	for (const el of radio) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#d5d5d5'
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
