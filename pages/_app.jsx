import React, { useContext } from 'react'
import { Context, ContextProvider } from 'context/context'
import '@styles/globals.scss'
import { AnimatePresence } from 'framer-motion'
import { ConfigProvider, theme as AntTheme } from 'antd'

function App({ Component, pageProps, router }) {
	const getLayout = Component.getLayout || (page => page)

	return (
		<AnimatePresence wait>
			<ContextProvider>
				<ThemeProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</ThemeProvider>
			</ContextProvider>
		</AnimatePresence>
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
