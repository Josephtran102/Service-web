import React, { useContext, useEffect } from 'react'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { Context, ContextProvider } from 'context/context'
import store from '@store/store'
import { ConfigProvider, theme as AntTheme } from 'antd'
import { fetchPocketbaseProjects } from '@utils/fetchPocketbaseProjects'
import '@styles/globals.scss'

const makeStore = () => store
const wrapper = createWrapper(makeStore)

function App({ Component, pageProps, router }) {
	const getLayout = Component.getLayout || (page => page)

	const dispatch = store.dispatch

	useEffect(() => {
		fetchPocketbaseProjects().then(fetchedProjects => {
			dispatch({ type: 'SET_PROJECTS', payload: fetchedProjects })
		})
	}, [dispatch])

	return (
		<Provider store={store}>
			<ContextProvider>
				<ThemeProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</ThemeProvider>
			</ContextProvider>
		</Provider>
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

export default wrapper.withRedux(App)
