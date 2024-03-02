import Button from '@/components/ui/Button';
import useAuth from '@/hooks/useAuth';
import loginTelegram from '@/utils/api/loginTelegram';
import { ERROR_ALIAS_MESSAGE, userTemplate, ERROR_TOKEN_MESSAGE } from './utils';
// import { TelegramUser } from '@/types';
import * as jose from 'jose';
import React from 'react';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

export default function ProfileNoUser() {
  const { login } = useAuth();

  const handleTelegram = async (user: TelegramUser) => {
    if (!user.username) {
      return alert({ ERROR_ALIAS_MESSAGE });
    }
    try {
      const token = await loginTelegram(user);
      if (token) {
        const decoded = jose.decodeJwt(token);
        if (decoded) {
          login(userTemplate, token);
        } else {
          return alert({ ERROR_TOKEN_MESSAGE });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <h1>Авторизация</h1>
      <TelegramLoginButton botName={process.env.NEXT_PUBLIC_BOT_NAME} dataOnauth={handleTelegram} />
      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
        <Button onClick={async () => await handleTelegram(userTemplate)}>Imitate</Button>
      )}
    </section>
  );
}
