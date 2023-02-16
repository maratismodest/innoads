import React, { useCallback, useEffect, useRef, useState } from 'react'
import useOnScreen from 'hooks/useOnScreen'
import { PostInterface } from 'types'
import fetchPosts from 'utils/api/fetchPosts'

import Posts from 'components/Posts'
import Spinner from 'components/Spinner'

const InfinitePosts = ({
                           options,
                           initPosts,
                           initPage,
                       }: Props) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const isOnScreen = useOnScreen(elementRef)
    const [posts, setPosts] = useState<PostInterface[]>(initPosts)
    const [page, setPage] = useState<number>(initPage)
    const [hasMore, setHasMore] = useState(true)
    const [fetching, setFetching] = useState(false)

    const loadMore = useCallback(async () => {
        if (fetching) {
            return
        }
        setFetching(true)
        try {
            const { content, totalPages } = await fetchPosts({
                ...options,
                page,
                size: 20,
            })
            setPosts([...posts, ...content])
            setPage(prev => prev + 1)
            setHasMore(page + 1 < totalPages)
        } catch (e) {
            console.log(e)
        } finally {
            setFetching(false)
        }
    }, [posts, fetching, page, hasMore, options])

    useEffect(() => {
        if (isOnScreen && hasMore) {
            loadMore()
        }
    }, [isOnScreen, hasMore])

    //just reset component to initial state
    useEffect(() => {
        if (Object.keys(options).length) {
            setPosts([])
            setHasMore(true)
            setPage(initPage)
            setFetching(false)
        }
    }, [options])

    return (
        <>
            <Posts posts={posts} />
            {fetching && <Spinner />}
            <div ref={elementRef} />
        </>
    )
}

type Props = {
    options: Record<string, number>
    initPosts: PostInterface[],
    initPage: number
}

export default InfinitePosts
