import type {AppProps} from 'next/app'
import {YMInitializer} from "react-yandex-metrika";
import {AuthProvider} from '../context/AuthContext'
import '../styles/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <AuthProvider>
                <Component {...pageProps} />
                <YMInitializer accounts={[88487475]} options={{webvisor: true}} version="2"/>
            </AuthProvider>
        </>

    )
}

export default MyApp
