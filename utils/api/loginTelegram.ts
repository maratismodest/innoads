// import { TelegramUser } from '@/types';
import { TelegramUser } from 'telegram-login-button';
import client from './createRequest';

export default async function loginTelegram(user: TelegramUser) {
  try {
    const {
      data: { token },
    } = await client.post<{ token: string }>('/users/login', user);
    return token;
  } catch (e) {
    console.log(e);
  }
}
