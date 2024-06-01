import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

type UserWithBans = Prisma.UserGetPayload<{
  include: { bans: true };
}>;

export function getAllUsers(): Promise<UserWithBans[]> {
  return prisma.user.findMany({ include: { bans: true } });
}

export function getUserById(id: string) {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        bans: true,
      },
    });
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}
