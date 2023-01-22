import dynamic from 'next/dynamic'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostInterface } from 'types'
import fetchPosts from 'utils/api/fetchPosts'

import Item from 'components/Item/Item'
import Layout from 'components/Layout/Layout'
import Spinner from 'components/Spinner/Spinner'

import InfinitePosts from '../modules/InfinitePosts'

import classes from 'styles/classes.module.scss'
import home from 'styles/Home.module.scss'

const Categories = dynamic(() => import('components/Categories/Categories'), {
    ssr: true,
})


const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, totalPages }) => {
    const { t } = useTranslation()
    const count = useMemo(() => totalPages * 10, [totalPages])
    return (
        <Layout>
            <Categories />
            <div className={home.header}>
                <h1>{t('lastAds')}</h1>
                <span>
                    {count} {t('ads')}
                </span>
            </div>
           <InfinitePosts posts={posts} totalPages={totalPages} options={{}}/>
        </Layout>
    )
}
export default Home

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
        revalidate: 180,
    }
}

