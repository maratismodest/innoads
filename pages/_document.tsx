import Document, {
    DocumentProps,
    Head,
    Html,
    Main,
    NextScript} from 'next/document'
import Script from 'next/script'
import React from 'react'

import i18nextConfig from '../next-i18next.config'

type Props = DocumentProps & {
    // add custom document props
}

class MyDocument extends Document<Props> {
    render() {
        const currentLocale =
            this.props.__NEXT_DATA__.locale ??
            i18nextConfig.i18n.defaultLocale
        return (
            <Html lang={currentLocale}>
                <Head>
                    <meta charSet='utf-8' />
                    <meta name='robots' />
                    <link rel='icon' href='/favicon.ico' />
                    <link rel='manifest' href='/manifest.json' />
                    <meta property='og:type' content='website' />
                    <meta name='publisher' content='InnoAds' />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

// import { Head, Html, Main, NextScript } from 'next/document'
//
// export default function Document() {
//     const currentLocale =
//         this.props.__NEXT_DATA__.locale ??
//         i18nextConfig.i18n.defaultLocale
//     return (
//         <Html lang={'ru'}>
//             <Head>
//                 <meta charSet="utf-8" />
//                 <meta name="robots" />
//                 <link rel="icon" href="/favicon.ico" />
//                 <link rel="manifest" href="/manifest.json" />
//                 <meta property="og:type" content="website" />
//                 <meta name="publisher" content="InnoAds" />
//             </Head>
//             <body>
//                 <Main />
//                 <NextScript />
//             </body>
//         </Html>
//     )
// }
