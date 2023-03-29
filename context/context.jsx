import { changeStyles } from 'utils/changeStyles'
import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = props => {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme(theme => (theme = 'dark'))
		} else {
			setTheme(theme => (theme = 'light'))
		}

		changeStyles(theme)
	}

	return (
		<Context.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</Context.Provider>
	)
}
