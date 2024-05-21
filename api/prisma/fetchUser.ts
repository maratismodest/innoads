'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export default async function fetchUser(userId: number): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user as User;
}
