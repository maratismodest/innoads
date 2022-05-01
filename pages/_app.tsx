import type {AppProps} from 'next/app'
import {AuthProvider} from '../context/AuthContext'
import {YMInitializer} from "react-yandex-metrika";
import '../styles/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <YMInitializer accounts={[88487475]}/>
        </AuthProvider>
    )
}

export default MyApp
