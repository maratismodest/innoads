'use client';
import Script from 'next/script';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import type { ITelegramUser, IWebApp } from '@/types';
import { TelegramWebApps } from 'telegram-webapps';
export interface ITelegramContext {
  tg?: TelegramWebApps.WebApp;
}

export const TelegramContextNew = createContext<ITelegramContext>({});

export const TelegramProviderNew = ({ children }: { children: React.ReactNode }) => {
  const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | null>(null);

  useEffect(() => {
    const app = (window as any).Telegram.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          tg: webApp,
          unsafeData: webApp.initDataUnsafe,
          tgUser: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContextNew.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </TelegramContextNew.Provider>
  );
};

export const useTelegramNew = () => useContext(TelegramContextNew);
