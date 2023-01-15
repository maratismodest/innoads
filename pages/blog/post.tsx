import {GetStaticProps} from 'next/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React from 'react'

import MainLayout from 'components/Layout/Layout'
import MDX from 'components/MDX/post.mdx'

const seoTitle = 'Как выгодно продать на досках объявлений'
const seoDescription =
    'Для начала, постарайтесь сделать хорошое фото вашего товара. Найдите все аксесуары, чеки и упаковку.'

export default function Post() {
    return (
        <MainLayout title={seoTitle} description={seoDescription}>
            <MDX/>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
