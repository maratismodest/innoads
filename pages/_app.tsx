import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { AuthProvider } from 'context/AuthContext'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default appWithTranslation(MyApp)
