'use client';
import WebApp from '@twa-dev/sdk';
import { ReactNode, useEffect, useState } from 'react';

import useAuth from '@/hooks/provider/useAuth';
import { TelegramContext } from '@/providers/TelegramProvider/TelegramContext';
import { TgUserData } from '@/types';
import loginTelegram from '@/utils/api/prisma/loginTelegram';

type Props = {
  children: ReactNode;
};

export function TelegramProvider({ children }: Props) {
  const { login } = useAuth();
  const [tgLoading, setTgLoading] = useState(false);
  const [tgUserData, setTgUserData] = useState<TgUserData | null>(null);
  const handleApp = async () => {
    if (typeof window !== 'undefined') {
      setTgLoading(true);
      try {
        if (WebApp.initDataUnsafe.user) {
          setTgUserData(WebApp.initDataUnsafe.user as TgUserData);
        }
      } catch (err) {
        console.error('TelegramProvider error:', err);
      } finally {
        setTgLoading(false);
      }
    }
  };

  useEffect(() => {
    if (tgUserData) {
      loginTelegram(tgUserData).then(res => {
        if (res) {
          const { token, upsertUser } = res;
          localStorage.setItem('token', token);
          login(upsertUser, token);
        }
      });
    }
  }, [tgUserData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleApp().then(() => {
        console.warn('App Login Success');
      });
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ tgUserData, tgLoading }}>
      {children}
    </TelegramContext.Provider>
  );
}
