'use client'

import Layout from '@/components/Layout';
import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import buttonStyles from '@/styles/buttonStyles';
import type {PostDTO, Seo, TelegramUser} from '@/types';
import client from '@/utils/api/createRequest';
import fetchPosts from '@/utils/api/fetchAds';
import {routes, seo} from '@/utils/constants';
import * as jose from 'jose';
import Link from 'next/link';
import React, {useCallback, useEffect, useState} from 'react';
import TelegramLoginButton from 'telegram-login-button';

const error = 'Добавьте алиас у себя в аккаунте / Add alias into your account!';

type Props = {
  seo: Seo
}

export default function Profile<NextPage>(
  // { seo }: Props
) {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [fetching, setFetching] = useState(false);
  const { user, login, logout } = useAuth();

  const handleTelegram = async ({ username, id }: TelegramUser) => {
    if (!username) {
      return alert({ error });
    }
    try {
      const user = { id, username };
      const { data } = await client.post('/users/login', user);
      const decoded = jose.decodeJwt(data.token);
      if (decoded) {
        login(user, data.token);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const handleTelegramImitate = useCallback(async () => {
    const userTemplate: TelegramUser = {
      first_name: process.env.NEXT_PUBLIC_FIRST_NAME as string,
      last_name: process.env.NEXT_PUBLIC_LAST_NAME as string,
      id: Number(process.env.NEXT_PUBLIC_ID),
      photo_url: process.env.NEXT_PUBLIC_PHOTO_URL as string,
      username: process.env.NEXT_PUBLIC_USERNAME as string,
      auth_date: 0,
      hash: ''
    };
    try {
      const user = { id: userTemplate.id, username: userTemplate.username };
      const { data } = await client.post('/users/login', user);
      const decoded = await jose.decodeJwt(data.token);
      if (decoded) {
        login(user, data.token);
      }
    } catch (e) {
      console.log(e);
    }
  }, [login]);

  useEffect(() => {
    if (user) {
      setFetching(true);
      fetchPosts({ userId: user.id }).then(({ content }) => setPosts(content)).catch(e => alert(e.message)).finally(() => setFetching(false));
    }
  }, [user]);

  if (!user) {
    return (
      <Layout {...seo}>
        <div className='flex flex-col items-center'>
          <h2>Авторизация</h2>
          <TelegramLoginButton
            botName='InnoAdsPostBot'
            dataOnauth={handleTelegram}
          />
          {process.env.NEXT_PUBLIC_NODE_ENV == 'development' &&
            <Button onClick={handleTelegramImitate} data-testid='development-login-button'>Imitate</Button>}
        </div>
      </Layout>
    );
  }

  return (
    // <Layout {...seo} className='flex flex-col items-center gap-8'>
    <div className='flex flex-col items-center gap-8'>
      <div className='text-center'>
        <h1>Профиль</h1>
        <p>Добавить объявление</p>
      </div>
      <Link href={routes.add} className={buttonStyles()}>&#43;</Link>
      {fetching && <Spinner />}
      {posts.length > 0 && !fetching && <Posts posts={posts} edit={true} />}
      {posts.length === 0 && !fetching && <h2>Нет объявлений</h2>}
      <Button onClick={logout} data-testid='logout'>Выход</Button>
    </div>

    // </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale as string)),
//       seo: seo.profile
//     },
//     revalidate: revalidate
//   };
// };
