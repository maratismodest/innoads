import React, { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostInterface } from 'types'
import fetchPosts from 'utils/api/fetchPosts'

import Item from 'components/Item/Item'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'

const InfinitePosts = ({
                           posts,
                           totalPages,
                           options,
                       }: { posts: PostInterface[], totalPages: number, options: Record<string, number> }) => {
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [infinite, setInfinite] = useState<PostInterface[]>(posts)

    const loadMore = useCallback(async () => {
        if (hasMore) {
            try {
                const { content, totalPages } = await fetchPosts({
                    page: page + 1,
                    size: 10,
                    ...options,
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
        <div style={{ height: 'calc(100vh-66px-68px)' }}>
            <InfiniteScroll
                pageStart={page}
                loadMore={loadMore}
                hasMore={hasMore}
                initialLoad={true}
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
    )
}

export default InfinitePosts
