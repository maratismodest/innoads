import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Inter} from 'next/font/google'
import {appWithTranslation} from 'next-i18next'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({subsets: ['latin']})

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)
