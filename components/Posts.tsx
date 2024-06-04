import Item from '@/components/Item';
import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
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
          <Link href={`${routes.post}/${post.slug}`} title={post.title}>
            <Item post={post} edit={edit} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
