import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import MainLayout from 'components/Layout/Layout'
import MDX from 'components/MDX/delete.mdx'

export default function Delete() {
    return (
        <MainLayout title="Чтобы удалить свои данные, напишие к нам запрос">
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
