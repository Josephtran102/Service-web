export const changeStyles = theme => {
	const body = document.body
	const antTypography = document.getElementsByClassName('ant-typography')
	const antMenuLight = document.getElementsByClassName('ant-menu-light')
	const segmented = document.getElementsByClassName('ant-segmented')
	const input = document.getElementsByClassName('ant-input')
	const segmentedSelected = document.getElementsByClassName('ant-segmented-item-selected')
	const submenu = document.getElementsByClassName('ant-menu-submenu-title')
	const radio = document.getElementsByClassName('ant-radio-button-wrapper')
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
	for (const el of segmented) {
		if (el) {
			el.style.backgroundColor = isLight ? '#e0e0e0' : '#8f8f96'
		}
	}
	for (const el of segmentedSelected) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#333'
			el.style.color = isLight ? '#000' : '#fff'
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
	for (const el of input) {
		if (el) {
			el.style.backgroundColor = isLight ? '#fff' : '#ffffffef'
		}
	}
}
