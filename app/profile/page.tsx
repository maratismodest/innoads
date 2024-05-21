'use client';

import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import buttonStyles from '@/styles/buttonStyles';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { routes } from '@/utils/constants';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Post } from '@prisma/client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Profile<NextPage>() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      setFetching(true);
      fetchPosts({ userId: user.id })
        .then(content => setPosts(content))
        // .then(content => setPosts(content.filter(({ published }) => published === true)))
        .catch(e => alert(e.message))
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (!user) {
    return <ProfileNoUser />;
  }

  const archived = posts.filter(post => post.published === false);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1>Профиль</h1>
        <p>Добавить объявление</p>
      </div>
      <Link href={routes.add} className={buttonStyles()}>
        &#43;
      </Link>
      {fetching && <Spinner />}
      {posts.length > 0 && !fetching && (
        <>
          <Posts posts={posts.filter(({ published }) => published === true)} edit={true} />
          {archived.length > 0 && (
            <>
              <hr />
              <div className="w-full">
                <div className="text-center">
                  <h2>Архивные</h2>
                  <p>
                    Вы отметили их как не актуальные: для пользовтелей сайта они не отображаются.
                  </p>
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
            </>
          )}
        </>
      )}
      {posts.length === 0 && !fetching && <h2>Нет объявлений</h2>}
      <Button onClick={logout}>Выход</Button>
    </div>
  );
}
