import axios from 'axios'
import { AuthProvider } from 'context/AuthContext'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika'
import 'styles/globals.scss'

axios.defaults.headers.common['Secret'] = `${process.env.NEXT_PUBLIC_SECRET}`

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthProvider>
                <Component {...pageProps} />
                <YMInitializer
                    accounts={[88487475]}
                    options={{ webvisor: true, differ: true }}
                    version="2"
                />
            </AuthProvider>
        </>
    )
}

export default appWithTranslation(MyApp)
