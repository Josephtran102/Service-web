import { createContext, useEffect, useState } from 'react'
import { changeStyles } from 'utils/changeStyles'

export const Context = createContext()

const setThemeInStorage = theme => {
	localStorage.setItem('theme', theme)
}
const getThemeInStorage = () => {
	return localStorage.getItem('theme')
}

export const ContextProvider = props => {
	const [theme, setTheme] = useState('dark')

	useEffect(() => {
		if (getThemeInStorage() === 'dark') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}, [])

	useEffect(() => {
		changeStyles(theme)
		setThemeInStorage(theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	return <Context.Provider value={{ theme, toggleTheme }}>{props.children}</Context.Provider>
}
