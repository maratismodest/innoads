'use client';
import { createContext } from 'react';

import { TgUserData } from '@/types/global';

type telegramContextType = {
  tgUserData: TgUserData | null;
};

const telegramContextDefaultValues: telegramContextType = {
  tgUserData: null,
};

export const TelegramContext = createContext<telegramContextType>(telegramContextDefaultValues);
