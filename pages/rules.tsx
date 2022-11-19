import MDX from 'components/MDX/rules.mdx'
import MainLayout from 'components/MainLayout/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next/types'
import React from 'react'

const Agreement = () => {
    return (
        <MainLayout
            title="Правила"
            description="Правила доски объявлений города Иннополис InnoAds"
        >
            <MDX />
        </MainLayout>
    )
}

export default Agreement

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
