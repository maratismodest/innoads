import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang={'ru'}>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="robots"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}