import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import axios from 'axios'
import { AuthProvider } from 'context/AuthContext'

import 'styles/globals.scss'

axios.defaults.headers.common['Secret'] = `${process.env.NEXT_PUBLIC_SECRET}`

function MyApp({ Component, pageProps }: AppProps) {

    return (
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
    )
}

export default appWithTranslation(MyApp)
