'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { TelegramUser } from 'telegram-login-button';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export default async function loginTelegram(user: TelegramUser | User) {
  try {
    const { id, username } = user;
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
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(60 * 60 * 24 * 365 * 1000)
      .sign(secret);
    return { token, upsertUser };
  } catch (e) {
    console.log(e);
  }
}
