'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import useAuthActions from '@/hooks/provider/useAuthActions';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import ChangeTheme from '@/pages-lib/profile/ChangeTheme';
import ProfileError from '@/pages-lib/profile/ProfileError';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import LogoutSvg from '@/public/svg/out.svg';
import buttonStyles from '@/styles/buttonStyles';

export default function ProfilePage<NextPage>() {
  const t = useTranslations();
  const { user, loading, tgUserData } = useAuth();
  const { logout } = useAuthActions();
  const userId = user?.id;

  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({ userId, published: true }, Boolean(userId));

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <ProfileNoUser />;
  }

  if (postsError) {
    return <ProfileError onClick={postsRefetch} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <h1>{t('Профиль')}</h1>
        <button
          id="refetch-posts"
          className={clsx(buttonStyles())}
          onClick={() => {
            postsRefetch();
          }}
        >
          Обновить данные
        </button>
      </div>
      <Posts posts={posts} edit={true} loading={postsLoading} error={postsError} className="mt-4" />

      {!tgUserData && (
        <div className="mt-auto">
          <ChangeTheme className="my-4" />
          <div className="flex justify-center">
            <button className={clsx(buttonStyles({ size: 'medium' }))} onClick={logout}>
              <LogoutSvg className="size-4" />
              <span>Выход</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
