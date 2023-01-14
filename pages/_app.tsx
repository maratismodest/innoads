import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import React from 'react'
import {MDXProvider} from "@mdx-js/react";
import axios from 'axios'
import {AuthProvider} from 'context/AuthContext'
import {MDXComponents} from "mdx/types";

import {mdxComponents} from 'components/MDX/components'

import 'styles/globals.scss'

axios.defaults.headers.common['Secret'] = `${process.env.NEXT_PUBLIC_SECRET}`

function MyApp({Component, pageProps}: AppProps) {
    return (
        <MDXProvider components={mdxComponents as MDXComponents}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </MDXProvider>
    )
}

export default appWithTranslation(MyApp)
