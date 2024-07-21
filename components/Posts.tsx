import { Post } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

import Item from '@/components/Item';
import Spinner from '@/components/ui/Spinner';
import { routes } from '@/utils/constants';
import { messages } from '@/utils/messages';

interface PostsInterface extends ComponentPropsWithoutRef<'ul'> {
  posts?: Post[];
  edit?: boolean;
  loading?: boolean;
  error?: Error | null;
}

export default function Posts({
  posts,
  edit = false,
  loading = false,
  error = null,
  className,
}: PostsInterface) {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <h2 className="text-center">
        {messages.somethingWentWrong}: {error.message}
      </h2>
    );
  }

  if (!posts || posts.length === 0) {
    return <h2 className="text-center">Пусто</h2>;
  }

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
