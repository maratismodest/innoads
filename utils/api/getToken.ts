'use server';
import type { User } from '@prisma/client';
import * as jose from 'jose';

import { expirationTime, getTokenAlg, secret } from '@/utils/constants';

export default async function getToken(user: Pick<User, 'id' | 'username'>) {
  try {
    const { id, username } = user;

    const token = await new jose.SignJWT({
      id,
      username,
    })
      .setProtectedHeader({ alg: getTokenAlg })
      .setExpirationTime(expirationTime)
      .sign(secret);
    return token;
  } catch (e) {
    console.log(e);
  }
}
