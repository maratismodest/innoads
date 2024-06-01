// import { TelegramUser } from '@/types';

import { TelegramUser } from 'telegram-login-button';

const userTemplate: TelegramUser = {
  id: Number(process.env.NEXT_PUBLIC_ID),
  first_name: process.env.NEXT_PUBLIC_FIRST_NAME as string,
  // @ts-ignore
  last_name: process.env.NEXT_PUBLIC_LAST_NAME as string,
  photo_url: process.env.NEXT_PUBLIC_PHOTO_URL as string,
  username: process.env.NEXT_PUBLIC_USERNAME as string,
  auth_date: 0,
  hash: '',
};

const ERROR_ALIAS_MESSAGE = 'Добавьте алиас у себя в аккаунте!';
const ERROR_TOKEN_MESSAGE = 'Что-то пошло не так: перезагрузите страницу ';

export { userTemplate, ERROR_ALIAS_MESSAGE, ERROR_TOKEN_MESSAGE };
