import '@/styles/globals.css'
import AuthProvider from '@/context/AuthContext';
import FavouriteProvider from '@/context/FavouritesContext';
import ModalProvider from '@/context/ModalContext';
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
      <AuthProvider>
        <FavouriteProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </FavouriteProvider>
      </AuthProvider>
    </>
  )
}

export default appWithTranslation(App)
