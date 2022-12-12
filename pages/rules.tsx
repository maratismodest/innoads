import MainLayout from 'components/Layout/Layout'
import MDX from 'components/MDX/rules.mdx'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next/types'
import React from 'react'

export default function Agreement() {
    return (
        <MainLayout
            title='Правила'
            description='Правила доски объявлений города Иннополис InnoAds'
        >
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
