import React, {useCallback, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {PostInterface} from 'types'
import fetchPosts from 'utils/api/fetchPosts'

import Item from 'components/Item/Item'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'

const InfinitePosts = ({
                           options,
                       }: { options: Record<string, number> }) => {
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState(false)
    const [fetching, setFetching] = useState(false);

    const loadMore = useCallback(async () => {
        if (fetching) {
            return;
        }
        setFetching(true);
        try {
            const {content, totalPages} = await fetchPosts({
                ...options,
                page,
                size: 10,
            })
            setPosts([...posts, ...content]);
            setPage(prev => prev + 1);
            setHasMore(page + 1 < totalPages)
        } catch (e) {
            console.log(e)
        } finally {
            setFetching(false);
        }
    }, [posts, fetching, page, hasMore, options])

    useEffect(() => {
        setHasMore(true)
    }, [])

    useEffect(() => {
        setPosts([])
        setHasMore(true)
        setPage(0)
    }, [options])

    return (
        <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            loader={
                <div key={0}>
                    <Spinner/>
                </div>
            }
        >
            <ul className={classes.items}>
                {posts.map((post: PostInterface) => (
                    <Item post={post} key={post.slug}/>
                ))}
            </ul>
        </InfiniteScroll>
    )
}

export default InfinitePosts
