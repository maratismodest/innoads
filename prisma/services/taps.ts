import type { Tap } from '@prisma/client';

import prisma from '@/lib/prisma';

export function getAllTaps() {
  return prisma.tap.findMany();
}

export function getTapByPostId(userId: string) {
  return prisma.tap.findFirst({ where: { userId } });
}

export function createTap(formData: Tap) {
  return prisma.tap.create({
    data: formData,
  });
}

export function createUpdateTap(formData: Tap) {
  return prisma.tap.upsert({
    where: {
      userId: formData.userId,
    },
    update: {
      count: formData.count,
    },
    create: formData,
  });
}
