import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { getSortedPostsData } from 'utils/blogParse'
import revalidate from 'utils/revalidate'
import { Routes } from 'utils/routes'

import Layout from 'components/Layout/Layout'

export type BlogPost = {
    id: string, date: string, title: string
}

export type Props = {
    blogPosts: BlogPost[]
}

const Blog = ({ blogPosts }: Props) => {
    const { t } = useTranslation()
    const canonical = `${process.env.NEXT_PUBLIC_APP_URL}/blog`
    return (
        <Layout
            title='Блог сайта InnoAds'
            description='В этом разделе публикуется важная информация'
            canonical={canonical}
        >
            <h1>{t('blog')}</h1>
            <ul>
                {blogPosts.map((post) =>
                    <li key={post.id} style={{ marginBottom: 8 }}>
                        <Link href={Routes.blog + '/' + post.id}>{post.title}</Link>
                    </li>,
                )}
            </ul>
        </Layout>
    )
}

export default Blog

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const blogPosts = getSortedPostsData()
    return {
        props: {
            blogPosts,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate: revalidate,
    }
}
