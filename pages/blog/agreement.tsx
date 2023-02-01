import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import Layout from 'components/Layout/Layout'
import MDX from 'components/MDX/agreement.mdx'

export default function Agreement() {
    return (
        <Layout title="Пользовательское соглашение">
            <MDX />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
