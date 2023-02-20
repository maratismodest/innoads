import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { AuthProvider } from 'context/AuthContext'
import { FavouriteProvider } from 'context/FavouritesContext'
import { ModalProvider } from 'context/ModalContext'

import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <FavouriteProvider>
                <ModalProvider>
                    <Component {...pageProps} />
                </ModalProvider>
            </FavouriteProvider>
        </AuthProvider>
    )
}

export default appWithTranslation(MyApp)
