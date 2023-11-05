import Button from '@/components/ui/Button';
import useAuth from '@/hooks/useAuth';
import { TelegramUser } from '@/types';
import client from '@/utils/api/createRequest';
import * as jose from 'jose';
import React, { useCallback } from 'react';
import TelegramLoginButton from 'telegram-login-button';

const ERROR_MESSAGE = 'Добавьте алиас у себя в аккаунте!';

const userTemplate: TelegramUser = {
  first_name: process.env.NEXT_PUBLIC_FIRST_NAME as string,
  last_name: process.env.NEXT_PUBLIC_LAST_NAME as string,
  id: Number(process.env.NEXT_PUBLIC_ID),
  photo_url: process.env.NEXT_PUBLIC_PHOTO_URL as string,
  username: process.env.NEXT_PUBLIC_USERNAME as string,
  auth_date: 0,
  hash: '',
};

const ProfileNoUser = () => {
  const { login } = useAuth();
  const handleTelegram = async ({ username, id }: TelegramUser) => {
    if (!username) {
      return alert({ ERROR_MESSAGE });
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

  return (
    <div className='flex flex-col items-center flex-1 justify-center'>
      <h1>Авторизация</h1>
      <TelegramLoginButton
        botName='InnoAdsPostBot'
        // @ts-ignore
        dataOnauth={handleTelegram}
      />
      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && <Button onClick={handleTelegramImitate}>Imitate</Button>}
    </div>
  );
};

export default ProfileNoUser;
