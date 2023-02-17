import dynamic from 'next/dynamic'
import {GetStaticProps, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React, {useMemo} from 'react'
import InfinitePosts from 'modules/InfinitePosts'
import {PostInterface} from 'types'
import fetchPosts from 'utils/api/fetchPosts'
import {Seo, seo} from "utils/constants";

import Layout from 'components/Layout'

const Categories = dynamic(() => import('components/Categories'), {
    ssr: true,
})

const Home: NextPage<Props> = ({posts, totalPages, seo}) => {
    const {t} = useTranslation()
    const count = useMemo(() => totalPages * 20, [totalPages])
    return (
        <Layout {...seo}>
            <Categories/>
            <div className='flex justify-between align-baseline'>
                <h1>{t('lastAds')}</h1>
                <span>{count} {t('ads')}</span>
            </div>
            <InfinitePosts initPosts={posts} initPage={1} options={{}}/>
        </Layout>
    )
}
export default Home

type Props = {
    posts: PostInterface[],
    totalPages: number,
    seo: Seo
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    const {content: posts, totalPages} = await fetchPosts({
        size: 20,
    })

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            seo: seo.default,
            posts,
            totalPages,
            ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
        },
        revalidate: 180,
    }
}

