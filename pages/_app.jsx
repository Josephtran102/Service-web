import React from 'react'
import { ContextProvider } from 'context/context'
import '@styles/globals.scss'

function App({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)

	return (
		<ContextProvider>{getLayout(<Component {...pageProps} />)}</ContextProvider>
	)
}

export default App
