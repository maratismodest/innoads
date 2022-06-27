import {AuthProvider} from 'context/AuthContext'
import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app'
import {ModalProvider} from "react-modal-hook";

import {YMInitializer} from "react-yandex-metrika";

import 'styles/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <AuthProvider>
                <ModalProvider>
                    <Component {...pageProps} />
                    <YMInitializer accounts={[88487475]} options={{webvisor: true, differ: true}} version="2"/>
                </ModalProvider>
            </AuthProvider>
        </>

    )
}

// export default MyApp
export default appWithTranslation(MyApp);

