import {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet='utf-8'/>
        <meta name='robots'/>
        <link rel='icon' href='/favicon.ico'/>
        <link rel='manifest' href='/manifest.json'/>
        <meta property='og:type' content='website'/>
        <meta name='publisher' content='InnoAds'/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      {process.env.NODE_ENV !== 'development' && <Script
          id='yandex-metrika'
          strategy='afterInteractive'
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
      />}
      </body>
    </Html>
  )
}
