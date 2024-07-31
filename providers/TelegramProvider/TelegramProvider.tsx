'use client';
import WebApp from '@twa-dev/sdk';
import { ReactNode, useEffect, useState } from 'react';

import { TelegramContext } from '@/providers/TelegramProvider/TelegramContext';
import { TgUserData } from '@/types/global';

type Props = {
  children: ReactNode;
};

export function TelegramProvider({ children }: Props) {
  const [tgUserData, setTgUserData] = useState<TgUserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setTgUserData(WebApp.initDataUnsafe.user as TgUserData);
    }
  }, []);

  return <TelegramContext.Provider value={{ tgUserData }}>{children}</TelegramContext.Provider>;
}
