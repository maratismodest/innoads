// import { TelegramUser } from '@/types';
'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { TelegramUser } from 'telegram-login-button';

const secret = new TextEncoder().encode('Kazan2023!');

export default async function loginTelegram(user: TelegramUser | User) {
  try {
    const { id, username } = user;
    const upsertUser = await prisma.user.upsert({
      where: {
        id: id,
      },
      update: {
        username: username,
      },
      create: {
        id: id,
        username: username,
      },
    });

    const token = await new jose.SignJWT({
      id,
      username,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(60 * 60 * 24 * 365 * 1000)
      .sign(secret);
    return { token, upsertUser };
  } catch (e) {
    console.log(e);
  }
}
