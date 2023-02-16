import React, { HTMLProps } from 'react'
import { clsx } from 'clsx'
import { PostInterface } from 'types'

import Item from 'components/Item'

interface PostsInterface extends HTMLProps<HTMLUListElement> {
    posts: PostInterface[]
    edit?: boolean
}

const Posts = ({ posts, edit = false, className = '' }: PostsInterface) => {
    return (
        <ul className={clsx('items', className)}>
            {posts.map((post: PostInterface) => <Item post={post} key={post.slug} edit={edit} />)}
        </ul>
    )
}

export default Posts
