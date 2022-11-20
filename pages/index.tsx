import Modal from '../components/Modal/Modal'
import { Routes, SEO_DESCRIPTION, SEO_IMAGE, SEO_TITLE } from '../constants'
import axios from 'axios'
import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/MainLayout/MainLayout'
import Search from 'components/Search/Search'
import Spinner from 'components/Spinner/Spinner'
import { getUrl } from 'functions/getUrl'
import { PostInterface } from 'interfaces'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import InfiniteScroll from 'react-infinite-scroller'
import home from 'styles/Home.module.scss'
import classes from 'styles/classes.module.scss'

const Categories = dynamic(() => import('components/Categories/Categories'), {
    ssr: true,
})

interface HomeProps {
    posts: PostInterface[];
    totalPages: number;
}

type SearchSubmitForm = {
    search: string
}

const Home: NextPage<HomeProps> = ({ posts, totalPages }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const { handleSubmit, register } = useForm<SearchSubmitForm>({
        defaultValues: {
            search: '',
        },
    })
    const [infinite, setInfinite] = useState<PostInterface[]>(posts)
    const count = useMemo(() => totalPages * 10, [totalPages])

    const loadFunc = useCallback(async () => {
        try {
            const response = await axios.get(getUrl(0, page + 1, 10))
            const posts = response.data.content
            setPage((prevState: number) => prevState + 1)
            setInfinite((prevState: PostInterface[]) => [
                ...prevState,
                ...posts,
            ])
            setHasMore(page + 1 < response.data.totalPages)
            return posts
        } catch (e) {
            console.log(e)
        }
    }, [page])

    const onSubmit = async ({ search }: SearchSubmitForm) =>
        router.push({
            pathname: Routes.search,
            query: { keyword: search },
        })

    return (
        <MainLayout>
            <form className={home.search} onSubmit={handleSubmit(onSubmit)}>
                <Search
                    type='text'
                    placeholder={t('search')}
                    name='search'
                    required={true}
                    register={register}
                    className={home.searchInput}
                />
                <Button type='submit'>{t('search')}</Button>
            </form>
            <Categories />
            <div className={home.header}>
                <h1 className={classes.title}>{t('lastAds')}</h1>
                <span>
                    * {count} {t('ads')}
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
                        {infinite.map((post: PostInterface) => <Item post={post} key={post.slug} />)}
                    </ul>
                </InfiniteScroll>
            </div>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { data } = await axios.get(getUrl(0, 0, 10))

    const { content: posts, totalPages } = data

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts,
            totalPages,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate: 60,
    }
}

export default Home
