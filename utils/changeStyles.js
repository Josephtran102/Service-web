export const changeStyles = theme => {
	if (theme === 'light') {
		document.body.style.backgroundColor = '#171717'
		document.body.style.color = '#fff'
		let typo = document.getElementsByClassName('ant-typography')
		let res = document.getElementsByClassName('ant-menu-light')
		let active = document.querySelector(`div[aria-expanded='true']`)
		let title = document.getElementsByClassName('ant-menu-submenu-title')
		let link = document.getElementsByClassName('ant-anchor-link-title')

		for (let i = 0; i < res.length; i++) {
			if (res) res[i].classList.add('ant-menu-dark')
		}
		for (let i = 0; i < title.length; i++) {
			if (title) title[i].style.backgroundColor = '#000'
		}
		if (active) active.style.backgroundColor = '#030329'
		for (let i = 0; i < link.length; i++) {
			if (link) link[i].style.color = '#fff'
		}
		for (let i = 0; i < typo.length; i++) {
			if (typo) typo[i].style.color = '#000'
		}
	} else {
		document.body.style.backgroundColor = '#fefefe'
		document.body.style.color = '#000'
		let typo = document.getElementsByClassName('ant-typography')
		let res = document.getElementsByClassName('ant-menu-light')
		let title = document.getElementsByClassName('ant-menu-submenu-title')
		let active = document.querySelector(`div[aria-expanded='true']`)
		let link = document.getElementsByClassName('ant-anchor-link-title')

		for (let i = 0; i < res.length; i++) {
			if (res) res[i].classList.remove('ant-menu-dark')
		}
		for (let i = 0; i < title.length; i++) {
			if (title) title[i].style.backgroundColor = '#fff'
		}
		if (active) active.style.backgroundColor = '#dbeafe'
		for (let i = 0; i < link.length; i++) {
			if (link) link[i].style.color = '#000'
		}
		for (let i = 0; i < typo.length; i++) {
			if (typo) typo[i].style.color = '#fff'
		}
	}
}
