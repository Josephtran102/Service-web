import React from 'react'
import { ContextProvider } from 'context/context'
import '@styles/globals.scss'
import { AnimatePresence } from 'framer-motion'

function App({ Component, pageProps, router }) {
   const getLayout = Component.getLayout || (page => page)

   return (
      <AnimatePresence wait>
         <ContextProvider>{getLayout(<Component {...pageProps} key={router.route} />)}</ContextProvider>
      </AnimatePresence>
   )
}

export default App
