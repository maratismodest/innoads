import React, {HTMLProps} from 'react'
import {clsx} from 'clsx'
import {PostDTO} from 'types/PostDTO'

import Item from 'components/Item'

interface PostsInterface extends HTMLProps<HTMLUListElement> {
  posts: PostDTO[]
  edit?: boolean
}

const Posts = ({posts, edit = false, className = ''}: PostsInterface) => {
  return (
    <ul className={clsx('items', className)} data-testid='posts'>
      {posts.map((post: PostDTO) => <Item post={post} key={post.slug} edit={edit}/>)}
    </ul>
  )
}

export default Posts
