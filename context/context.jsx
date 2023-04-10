import { changeStyles } from 'utils/changeStyles'
import { useState, createContext, useEffect } from 'react'

export const Context = createContext()

const setThemeInStorage = theme => {
	localStorage.setItem('theme', theme)
}
const getThemeInStorage = () => {
	return localStorage.getItem('theme')
}

export const ContextProvider = props => {
	const [theme, setTheme] = useState()

	useEffect(() => {
		if (getThemeInStorage() === 'dark') {
			setTheme('dark')
			changeStyles('light')
		} else {
			setTheme('light')
			changeStyles('dark')
		}
	}, [])

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme(theme => (theme = 'dark'))
			setThemeInStorage('dark')
		} else {
			setTheme(theme => (theme = 'light'))
			setThemeInStorage('light')
		}
		changeStyles(theme)
	}

	return (
		<Context.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</Context.Provider>
	)
}
