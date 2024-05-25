import Item from '@/components/Item';
import Spinner from '@/components/ui/Spinner';
import type { Post } from '@prisma/client';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

interface PostsInterface extends ComponentPropsWithoutRef<'ul'> {
  posts?: Post[];
  loading: boolean;
  error: Error | null;
}

export default function PostsReadOnly({ posts, className, loading, error }: PostsInterface) {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h2 className="text-center">Что-то пошло не так: {error.message}</h2>;
  }

  if (!posts || posts.length === 0) {
    return <h2 className="text-center">Пусто</h2>;
  }

  return (
    <ul className={clsx('items', className)} data-testid="posts">
      {posts.map((post: Post) => (
        <li key={post.id}>
          <Item post={post} />
        </li>
      ))}
    </ul>
  );
}
