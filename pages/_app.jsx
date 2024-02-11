import { theme as AntTheme, ConfigProvider } from 'antd'
import { useContext } from 'react'

import '@styles/globals.scss'
import { Context, ContextProvider } from 'context/context'
import { ThemeProvider } from 'next-themes'

function App({ Component, pageProps, router }) {
	const getLayout = Component.getLayout || (page => page)

	return (
		<ContextProvider>
			<CustomThemeProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</CustomThemeProvider>
		</ContextProvider>
	)
}

function CustomThemeProvider({ children }) {
	const { theme } = useContext(Context)
	const { defaultAlgorithm, darkAlgorithm } = AntTheme

	const borderColor = theme === 'dark' ? 'rgba(255,255,255, 0.17)' : 'rgba(0, 0, 0, 0.15)'
	const colorBgContainer = theme === 'dark' ? 'rgba(31, 31, 31, 1)' : '#fff'

	return (
		<ConfigProvider
			theme={{
				algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
				components: {
					Table: {
						borderColor: borderColor,
						colorBgContainer: colorBgContainer,
						algorithm: true
					}
				}
			}}
		>
			<ThemeProvider attribute='class'>{children}</ThemeProvider>
		</ConfigProvider>
	)
}

export default App
