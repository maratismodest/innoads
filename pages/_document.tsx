import Document, { DocumentProps, Head, Html, Main, NextScript } from 'next/document'
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
                <Script
                    id='yandex-metrika'
                    strategy='lazyOnload'
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(88487475, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });`,
                    }}
                /></body>
            </Html>
        )
    }
}

export default MyDocument
