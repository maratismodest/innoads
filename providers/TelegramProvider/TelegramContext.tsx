'use client';
import { createContext } from 'react';

import { TgUserData } from '@/types';

type telegramContextType = {
  tgUserData: TgUserData | null;
  tgLoading: boolean;
};

const telegramContextDefaultValues: telegramContextType = {
  tgUserData: null,
  tgLoading: false,
};

export const TelegramContext = createContext<telegramContextType>(telegramContextDefaultValues);
