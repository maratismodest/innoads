import {AuthProvider} from 'context/AuthContext'
import type {AppProps} from 'next/app'
import {YMInitializer} from "react-yandex-metrika";
// import { appWithTranslation } from 'next-i18next';

import 'styles/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <AuthProvider>
                <Component {...pageProps} />
                <YMInitializer accounts={[88487475]} options={{webvisor: true, differ: true}} version="2"/>
            </AuthProvider>
        </>

    )
}

export default MyApp
// export default appWithTranslation(MyApp);

