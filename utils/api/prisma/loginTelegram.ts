'use server';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { TelegramUser } from 'telegram-login-button';

import prisma from '@/lib/prisma';
import { TgUserData } from '@/types/global';
import { expirationTime, getTokenAlg, secret } from '@/utils/constants';

export default async function loginTelegram(user: TelegramUser | User | TgUserData) {
  try {
    const { id, username } = user;
    if (!username) {
      alert('У вашего профиля нужно заполнить @username!');
      return;
    }
    const upsertUser = await prisma.user.upsert({
      where: {
        id: String(id),
      },
      update: {
        username: username,
      },
      create: {
        id: String(id),
        username: username,
      },
      include: {
        bans: true,
      },
    });

    console.log('upsertUser', upsertUser);

    const token = await new jose.SignJWT({
      id,
      username,
    })
      .setProtectedHeader({ alg: getTokenAlg })
      .setExpirationTime(expirationTime)
      .sign(secret);
    return { token, upsertUser };
  } catch (e) {
    console.log(e);
  }
}
