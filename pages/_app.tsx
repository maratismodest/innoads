import Head from 'next/head'
import type {AppProps} from 'next/app'
import {AuthProvider} from '../context/AuthContext'
import {YMInitializer} from "react-yandex-metrika";
import '../styles/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
            <meta property="fb:pages" content="103265652394743" />
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
                <YMInitializer accounts={[88487475]} options={{webvisor: true}}/>
            </AuthProvider>
        </>

    )
}

export default MyApp
