import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import MainLayout from 'components/Layout/Layout'
import MDX from 'components/MDX/agreement.mdx'

export default function Agreement() {
    return (
        <MainLayout title="Пользовательское соглашение">
            <MDX />
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
