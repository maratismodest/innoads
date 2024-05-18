'use server';
import { User } from '@prisma/client';
import * as jose from 'jose';

const secret = new TextEncoder().encode('Kazan2023!');

export default async function getToken(user: Pick<User, 'id' | 'username'>) {
  try {
    const { id, username } = user;

    const token = await new jose.SignJWT({
      id,
      username,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(60 * 60 * 24 * 365 * 1000)
      .sign(secret);
    return token;
  } catch (e) {
    console.log(e);
  }
}
