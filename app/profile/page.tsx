'use client';

import type { Post } from '@prisma/client';
import { clsx } from 'clsx';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import usePostsQuery from '@/hooks/query/usePostsQuery';
// import Archived from '@/pages-lib/profile/Archived/Archived';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
// import LogoutSvg from '@/public/svg/out.svg';
import { stateAtom } from '@/state';
import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
// import { setTheme } from '@/utils/setTheme';

export default function ProfilePage<NextPage>() {
  const t = useTranslations();
  const { user, logout, loading } = useAuth();
  const userId = user?.id;
  const isTelegram = useAtomValue(stateAtom);
  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({ userId }, Boolean(userId));

  const active: Post[] = useMemo(() => posts.filter(post => post.published), [posts]);
  // const archived: Post[] = useMemo(() => posts.filter(post => !post.published), [posts]);
  // const onThemeChange = (theme: 'dark' | 'light') => {
  //   console.log('theme change', theme);
  //   localStorage.setItem('theme', theme);
  //   setTheme();
  // };

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <ProfileNoUser />;
  }

  if (postsError) {
    return (
      <div className="flex flex-col items-center gap-8">
        <h1>{t('Что-то пошло не так')}</h1>
        <button className={buttonStyles()} onClick={() => postsRefetch()}>
          {t('Попробовать снова')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1>{t('Профиль')}</h1>
        <p>Добавить объявление{isTelegram === 1 ? '.' : ''}</p>
        <Link
          href={isTelegram === 1 ? routes.bot : routes.add}
          className={clsx(buttonStyles(), 'flex h-12 w-full items-center justify-center !text-3xl')}
        >
          &#43;
        </Link>
        <button
          className={clsx(buttonStyles(), 'sr-only')}
          onClick={() => {
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
          {/*{archived.length > 0 && <Archived posts={archived} />}*/}
        </>
      )}
      {!postsLoading && posts.length === 0 && <h2>Нет объявлений</h2>}
      {/*{isTelegram !== 1 && (*/}
      {/*  <div className="mt-auto w-full">*/}
      {/*    <div className="mb-4 flex items-center justify-center gap-2">*/}
      {/*      <button className={buttonStyles()} onClick={() => onThemeChange('light')}>*/}
      {/*        light*/}
      {/*      </button>*/}
      {/*      <button className={buttonStyles()} onClick={() => onThemeChange('dark')}>*/}
      {/*        dark*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className="flex justify-center">*/}
      {/*      <button className={clsx(buttonStyles({ size: 'medium' }))} onClick={logout}>*/}
      {/*        <LogoutSvg className="size-4" />*/}
      {/*        <span>Выход</span>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
