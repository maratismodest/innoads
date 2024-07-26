'use client';
import { createContext } from 'react';

import { WebApp } from '@/types/telegram';

type TgContextType = {
  tg?: WebApp;
};

export const TelegramContext = createContext<TgContextType>({});


