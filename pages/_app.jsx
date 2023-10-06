import React, { useContext } from 'react'
import { ConfigProvider, theme as AntTheme } from 'antd'

import { Context, ContextProvider } from 'context/context'
import '@styles/globals.scss'

function App({ Component, pageProps, router }) {
	const getLayout = Component.getLayout || (page => page)

	return (
		<ContextProvider>
			<ThemeProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</ThemeProvider>
		</ContextProvider>
	)
}

function ThemeProvider({ children }) {
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
			{children}
		</ConfigProvider>
	)
}

export default App
