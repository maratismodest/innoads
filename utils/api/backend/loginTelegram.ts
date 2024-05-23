import { TelegramUser } from 'telegram-login-button';
import client, { beRoutes } from '../createRequest';

export default async function loginTelegram(user: TelegramUser) {
  try {
    const {
      data: { token },
    } = await client.post<{ token: string }>(beRoutes.users + '/login', user);
    return token;
  } catch (e) {
    console.log(e);
  }
}
