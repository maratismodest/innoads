'use client';
import { WebApp } from '@/types/telegram';
import Script from 'next/script';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type TgContextType = {
  tg?: WebApp;
};

export const TelegramContext = createContext<TgContextType>({});

type Props = {
  children: ReactNode;
};

export default function TelegramProvider({ children }: Props) {
  const [tg, setTg] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setTg(app);
    }
  }, []);

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
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
    </TelegramContext.Provider>
  );
}

export const useTelegramNew = () => useContext(TelegramContext);
