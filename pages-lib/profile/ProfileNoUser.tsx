import * as jose from 'jose';
import React from 'react';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

import useAuth from '@/hooks/provider/useAuth';
import useToast from '@/hooks/provider/useToast';
import buttonStyles from '@/styles/buttonStyles';
import loginTelegram from '@/utils/api/prisma/loginTelegram';

import { ERROR_ALIAS_MESSAGE, ERROR_TOKEN_MESSAGE, userTemplate } from './utils';

export default function ProfileNoUser() {
  const { login } = useAuth();
  const { toast } = useToast();

  const handleTelegram = async (user: TelegramUser) => {
    if (!user.username) {
      return toast(ERROR_ALIAS_MESSAGE);
    }
    try {
      const response = await loginTelegram(user);
      console.log('token', response);
      if (response) {
        const decoded = jose.decodeJwt(response.token);
        console.log('decoded', decoded);
        if (decoded) {
          if (response.upsertUser.bans.length) {
            toast('Ваш аккаунт заблокирован');
            return;
          }
          login(response.upsertUser, response.token);
        } else {
          return toast(ERROR_TOKEN_MESSAGE);
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
        <button className={buttonStyles()} onClick={async () => await handleTelegram(userTemplate)}>
          Imitate
        </button>
      )}
    </section>
  );
}
