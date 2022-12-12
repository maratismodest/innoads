import MainLayout from 'components/Layout/Layout'
import MDX from 'components/MDX/blog.mdx'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next/types'
import React from 'react'

const Blog = () => {
    const seoTitle = 'Как выгодно продать на досках объявлений'
    const seoDescription =
        'Для начала, постарайтесь сделать хорошое фото вашего товара. Найдите все аксесуары, чеки и упаковку.'
    const canonical = `${process.env.NEXT_PUBLIC_NODE_ENV}/blog`
    return (
        <MainLayout
            title={seoTitle}
            description={seoDescription}
            canonical={canonical}
        >
            <MDX />
        </MainLayout>
    )
}

export default Blog

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
