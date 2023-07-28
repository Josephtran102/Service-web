import React, { useContext, useEffect } from 'react'
import { ConfigProvider, theme as AntTheme } from 'antd'

import { Context, ContextProvider } from 'context/context'
import '@styles/globals.scss'
import reportWebVitals from '@utils/reportWebVitals'

function App({ Component, pageProps, router }) {
	const getLayout = Component.getLayout || (page => page)

	useEffect(() => {
		reportWebVitals(console.log)
	}, [])

	return (
		<ContextProvider>
			<ThemeProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</ThemeProvider>
		</ContextProvider>
	)
}

function ThemeProvider({ children }) {
	const { theme } = useContext(Context)
	const { defaultAlgorithm, darkAlgorithm } = AntTheme

	return (
		<ConfigProvider
			theme={{
				algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export default App
