import { useContext } from 'react';

import { TelegramContext } from '@/providers/TelegramProvider/TelegramContext';

export default function useTelegram() {
  return useContext(TelegramContext);
}
