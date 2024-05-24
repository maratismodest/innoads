import { TelegramContext } from '@/context/TelegramContext';
import { useContext } from 'react';

export default function useTelegram() {
  return useContext(TelegramContext);
}
