import dynamic from 'next/dynamic'
import { GetStaticProps, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useMemo } from 'react'
import InfinitePosts from 'modules/InfinitePosts'
import { PostInterface } from 'types'
import fetchPosts from 'utils/api/fetchPosts'

import Layout from 'components/Layout'

const Categories = dynamic(() => import('components/Categories'), {
    ssr: true,
})

const Home: NextPage<Props> = ({ posts, totalPages }) => {
    const { t } = useTranslation()
    const count = useMemo(() => totalPages * 10, [totalPages])
    return (
        <Layout>
            <Categories />
            <div className='flex justify-between align-baseline'>
                <h1>{t('lastAds')}</h1>
                <span>
                    {count} {t('ads')}
                </span>
            </div>
            <InfinitePosts initPosts={posts} initPage={1} options={{}} />
        </Layout>
    )
}
export default Home

type Props = {
    posts: PostInterface[],
    totalPages: number
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { content: posts, totalPages } = await fetchPosts({
        size: 10,
    })

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts,
            totalPages,
            ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
        },
        revalidate: 60 * 60,
    }
}

