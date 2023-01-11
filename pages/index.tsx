import dynamic from 'next/dynamic'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostInterface } from 'interfaces'
import fetchPosts from 'utils/api/fetchPosts'

import Item from 'components/Item/Item'
import Layout from 'components/Layout/Layout'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'
import home from 'styles/Home.module.scss'

const Categories = dynamic(() => import('components/Categories/Categories'), {
    ssr: true,
})

// type SearchSubmitForm = {
//     search: string
// }

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, totalPages }) => {
    // const router = useRouter()
    const { t } = useTranslation()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    // const { handleSubmit, register } = useForm<SearchSubmitForm>({
    //     defaultValues: {
    //         search: '',
    //     },
    // })
    const [infinite, setInfinite] = useState<PostInterface[]>(posts)
    const count = useMemo(() => totalPages * 10, [totalPages])

    const loadFunc = useCallback(async () => {
        try {
            const { content: posts, totalPages } = await fetchPosts(0, page + 1, 10)
            setPage((prevState: number) => prevState + 1)
            setInfinite((prevState: PostInterface[]) => [
                ...prevState,
                ...posts,
            ])
            setHasMore(page + 1 < totalPages)
            return posts
        } catch (e) {
            console.log(e)
        }
    }, [page])

    // const onSubmit = async ({ search }: SearchSubmitForm) =>
    //     router.push({
    //         pathname: Routes.search,
    //         query: { keyword: search },
    //     })

    return (
        <Layout>
            {/*<form className={home.search} onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <Search*/}
            {/*        type='text'*/}
            {/*        placeholder={t('search') as string}*/}
            {/*        name='search'*/}
            {/*        required={true}*/}
            {/*        register={register}*/}
            {/*        className={home.searchInput}*/}
            {/*    />*/}
            {/*    <Button type='submit'>{t('search')}</Button>*/}
            {/*</form>*/}
            <Categories />
            <div className={home.header}>
                <h1 className={classes.title}>{t('lastAds')}</h1>
                <span>
                    {count} {t('ads')}
                </span>
            </div>
            <div className={classes.magicWrapper}>
                <InfiniteScroll
                    pageStart={page}
                    loadMore={loadFunc}
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
    const { content: posts, totalPages } = await fetchPosts(0, 0, 10, 0)

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

