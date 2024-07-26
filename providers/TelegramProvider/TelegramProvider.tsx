'use client';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { WebApp } from '@/types/telegram';

import { TelegramContext } from './TelegramContext';

type Props = {
  children: ReactNode;
};

export function TelegramProvider({ children }: Props) {
  const [tg, setTg] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setTg(app);
    }
  }, []);

  useEffect(() => {
    // console.log('TgUpdated', tg);
    console.log('tg_initialized');
  }, [tg]);

  const value = useMemo(() => {
    return tg
      ? {
        tg,
      }
      : {};
  }, [tg]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
      {/*<Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />*/}
    </TelegramContext.Provider>
  );
}
