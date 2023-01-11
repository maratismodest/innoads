import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import InfiniteScroll from 'react-infinite-scroller'
import cn from 'classnames'
import useDebounce from 'hooks/useDebounce'
import { PostInterface } from 'interfaces'
import fetchPosts from 'utils/api/fetchPosts'
import { options } from 'utils/options'
import sortByCreatedAt from 'utils/sortByUpdatedAt'

import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'
import search from 'styles/Search.module.scss'
import selectStyles from 'styles/select.module.scss'

export default function SearchPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [infinite, setInfinite] = useState([])
    const [input, setInput] = useState('')
    const [categoryId, setCategoryId] = useState(
        Number(router.query['categoryId']) || 1,
    )
    const debouncedValue = useDebounce<string>(input, 500)


    const loadFunc = useCallback(
        async (currentPage: number = page) => {
            const response = await fetchPosts(categoryId, currentPage, isMobile ? 8 : 15)
            const posts: PostInterface[] = sortByCreatedAt(response.content)
            setPage((prevState) => prevState + 1)
            // @ts-ignore
            setInfinite((prevState: PostInterface[]) =>
                currentPage === 0 ? posts : [...prevState, ...posts],
            )
            setHasMore(currentPage + 1 < response.totalPages)
        },
        [page, categoryId, debouncedValue],
    )

    useEffect(() => {
        loadFunc(0)
    }, [debouncedValue, categoryId])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    useEffect(() => {
        const res = router.query['keyword']
        if (res && typeof res === 'string') {
            setInput(res)
        }
    }, [router.query])

    return (
        <MainLayout>
            <h1 className={classes.title}>{t('search')}</h1>
            <hr />
            <select className={cn(selectStyles.select, 'select-css')}
                    defaultValue={categoryId}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setCategoryId(Number(event.target.value))
                    }}>
                {options.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
            </select>
            {/*<Input*/}
            {/*    type='text'*/}
            {/*    placeholder={'Например, ноутбук'}*/}
            {/*    name='search'*/}
            {/*    required={true}*/}
            {/*    defaultValue={router.query.keyword}*/}
            {/*    value={input}*/}
            {/*    onChange={handleChange}*/}
            {/*    className={search.searchInput}*/}
            {/*/>*/}
            <hr />
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
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'common',
                'search',
            ])),
        },
    }
}
