'use client';

import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useAuth from '@/hooks/useAuth';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Post } from '@prisma/client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useMemo } from 'react';

export default function ProfilePage<NextPage>() {
  const { user, logout, loading } = useAuth();
  const userId = user?.id;
  const source = localStorage.getItem('telegram');
  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({ userId }, Boolean(userId));

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
        <h1>Что-то пошло не так</h1>
        <button className={buttonStyles()} onClick={() => postsRefetch()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
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
      <div className="text-center">
        <h1>Профиль</h1>
        <p>Добавить объявление</p>
        <Link
          href={source === '1' ? routes.bot : routes.add}
          className={clsx(
            buttonStyles({ size: 'medium' }),
            'flex h-16 w-full items-center justify-center !text-3xl'
          )}
        >
          &#43;
        </Link>
      </div>
      {postsLoading && <Spinner />}
      {!postsLoading && posts.length > 0 && (
        <>
          <Posts posts={posts.filter(({ published }) => published === true)} edit={true} />
          {archived.length > 0 && (
            <div className="w-full">
              <div className="text-center">
                <h2>Архивные</h2>
                <p>Вы отметили их как не актуальные: для пользовтелей сайта они не отображаются.</p>
              </div>
              <Disclosure>
                <DisclosureButton className="w-full py-2">
                  <p className={clsx(buttonStyles({ size: 'small' }), '!mx-auto')}>
                    показать/скрыть
                  </p>
                </DisclosureButton>
                <DisclosurePanel className="text-gray-500">
                  <Posts posts={archived} edit={false} className="pointer-events-none bg-gray" />
                </DisclosurePanel>
              </Disclosure>
            </div>
          )}
        </>
      )}
      {!postsLoading && posts.length === 0 && <h2>Нет объявлений</h2>}
      {/*<Button onClick={logout}>Выход</Button>*/}
    </div>
  );
}
