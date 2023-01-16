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

import classes from 'styles/classes.module.scss'
import home from 'styles/Home.module.scss'

const Categories = dynamic(() => import('components/Categories/Categories'), {
    ssr: true,
})


const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, totalPages }) => {
    const { t } = useTranslation()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(() => totalPages > 1)
    const [infinite, setInfinite] = useState<PostInterface[]>(posts)
    const count = useMemo(() => totalPages * 10, [totalPages])

    const loadMore = useCallback(async () => {
        if (hasMore) {
            try {
                const { content, totalPages } = await fetchPosts({
                    page: page + 1,
                    size: 10,
                })
                setPage(prevState => prevState + 1)
                setInfinite(prevState => [...prevState, ...content])
                setHasMore(page + 1 < totalPages - 1)
            } catch (e) {
                console.log(e)
            }
        }

    }, [page, hasMore, totalPages])


    return (
        <Layout>
            <Categories />
            <div className={home.header}>
                <h1>{t('lastAds')}</h1>
                <span>
                    {count} {t('ads')}
                </span>
            </div>
            <div style={{ height: 'calc(100vh-66px-68px)' }}>
                <InfiniteScroll
                    pageStart={page}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    initialLoad={false}
                    threshold={100}
                    loader={
                        <div key={0}>
                            <Spinner />
                        </div>
                    }
                >
                    <ul className={classes.items}>
                        {infinite.map((post: PostInterface) => (
                            <Item post={post} key={post.slug} />
                        ))}
                    </ul>
                </InfiniteScroll>
            </div>
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

