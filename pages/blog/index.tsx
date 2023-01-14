import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import Layout from 'components/Layout/Layout'
import MDX from 'components/MDX/blog.mdx'

const seoTitle = 'Как выгодно продать на досках объявлений'
const seoDescription =
    'Для начала, постарайтесь сделать хорошое фото вашего товара. Найдите все аксесуары, чеки и упаковку.'
const Blog = () => {
    const canonical = `${process.env.NEXT_PUBLIC_NODE_ENV}/blog`
    return (
        <Layout
            title={seoTitle}
            description={seoDescription}
            canonical={canonical}
        >
            <MDX />
        </Layout>
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
