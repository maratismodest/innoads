import prisma from '@/lib/prisma';
import { Ban } from '@prisma/client';

export function getAllBans(): Promise<Ban[]> {
  return prisma.ban.findMany();
}
export function getBanByUserId(userId: number) {
  try {
    return prisma.ban.findUnique({
      where: {
        id: Number(userId),
      },
    });
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}

export function createBan(userId: number) {
  return prisma.ban.create({
    data: { userId },
  });
}

export function deleteBan(userId: number) {
  return prisma.ban.deleteMany({
    where: {
      userId: Number(userId),
    },
  });
}
