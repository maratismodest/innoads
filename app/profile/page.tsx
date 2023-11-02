'use client';

import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import buttonStyles from '@/styles/buttonStyles';
import type { PostDTO } from '@/types';
import fetchPosts from '@/utils/api/fetchAds';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Profile<NextPage>() {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [fetching, setFetching] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setFetching(true);
      fetchPosts({ userId: user.id }).then(({ content }) => setPosts(content)).catch(e => alert(e.message)).finally(() => setFetching(false));
    }
  }, [user]);

  if (!user) {
    return (
      <ProfileNoUser />
    );
  }

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='text-center'>
        <h1>Профиль</h1>
        <p>Добавить объявление</p>
      </div>
      <Link href={routes.add} className={buttonStyles()}>&#43;</Link>
      {fetching && <Spinner />}
      {posts.length > 0 && !fetching && <Posts posts={posts} edit={true} />}
      {posts.length === 0 && !fetching && <h2>Нет объявлений</h2>}
      <Button onClick={logout}>Выход</Button>
    </div>
  );
}
