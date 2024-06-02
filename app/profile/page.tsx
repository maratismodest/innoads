'use client';

import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useAuth from '@/hooks/useAuth';
import Archived from '@/pages-lib/profile/Archived/Archived';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import { stateAtom } from '@/state';
import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import { messages } from '@/utils/messages';
import { Post } from '@prisma/client';
import { clsx } from 'clsx';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import React, { useMemo } from 'react';

export default function ProfilePage<NextPage>() {
  const { user, logout, loading } = useAuth();
  const userId = user?.id;
  const isTelegram = useAtomValue(stateAtom);
  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({ userId }, Boolean(userId));

  const active: Post[] = useMemo(() => posts.filter(post => post.published === true), [posts]);
  const archived: Post[] = useMemo(() => posts.filter(post => post.published === false), [posts]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <ProfileNoUser />;
  }

  if (postsError) {
    return (
      <div className="flex flex-col items-center gap-8">
        <h1>{messages.somethingWentWrong}</h1>
        <button className={buttonStyles()} onClick={() => postsRefetch()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-8">
      <div className="text-center">
        <h1>Профиль</h1>
        <p>Добавить объявление</p>
        <Link
          href={isTelegram === 1 ? routes.bot : routes.add}
          className={clsx(buttonStyles(), 'flex h-12 w-full items-center justify-center !text-3xl')}
        >
          &#43;
        </Link>
        <button
          className={clsx(buttonStyles(), 'sr-only')}
          onClick={() => {
            console.log('refetch posts');
            postsRefetch();
          }}
          id="refetch-posts"
        >
          Обновить данные
        </button>
      </div>
      {postsLoading && <Spinner />}
      {posts.length > 0 && (
        <>
          <Posts posts={active} edit={true} />
          {archived.length > 0 && <Archived posts={archived} />}
        </>
      )}
      {!postsLoading && posts.length === 0 && <h2>Нет объявлений</h2>}
      {isTelegram !== 1 && (
        <Button className="mt-auto" onClick={logout}>
          Выход
        </Button>
      )}
    </div>
  );
}
