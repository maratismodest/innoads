import Item from '@/components/Item';
import { Post } from '@prisma/client';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

interface PostsInterface extends ComponentPropsWithoutRef<'ul'> {
  posts: Post[];
  edit?: boolean;
}

export default function Posts({ posts, edit = false, className }: PostsInterface) {
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
