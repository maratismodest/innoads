import React, {HTMLProps} from 'react'
import {clsx} from 'clsx'
import {PostDTO} from '@/types'

import Item from '@/components/Item'

interface PostsInterface extends HTMLProps<HTMLUListElement> {
  posts: PostDTO[]
  edit?: boolean
}

export default function Posts({posts, edit = false, className = ''}: PostsInterface) {
  return (
    <ul className={clsx('items', className)} data-testid='posts'>
      {posts.map((post: PostDTO) => <Item key={post.id} post={post} edit={edit}/>)}
    </ul>
  )
}
