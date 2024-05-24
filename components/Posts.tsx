import { Post } from '@prisma/client';
import React, { HTMLProps } from 'react';
import clsx from 'clsx';

import Item from '@/components/Item';

interface PostsInterface extends HTMLProps<HTMLUListElement> {
  posts: Post[];
  edit?: boolean;
  refetch?: any;
}

export default function Posts({ posts, edit = false, className = '' }: PostsInterface) {
  return (
    <ul className={clsx('items', className)} data-testid="posts">
      {posts.map((post: Post) => (
        <li key={post.id}>
          <Item post={post} edit={edit} />
        </li>
      ))}
    </ul>
  );
}
