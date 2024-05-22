import prisma from '@/lib/prisma';
import { Ban } from '@prisma/client';

export function getAllBans(): Promise<Ban[]> {
  return prisma.ban.findMany();
}
export function getBanByUserId(userId: string) {
  try {
    return prisma.ban.findMany({
      where: {
        userId,
      },
    });
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

export function createBan(userId: string) {
  return prisma.ban.create({
    data: { userId },
  });
}

export function deleteBan(userId: string) {
  return prisma.ban.deleteMany({
    where: {
      userId,
    },
  });
}
