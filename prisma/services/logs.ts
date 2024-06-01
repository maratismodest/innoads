import prisma from '@/lib/prisma';
import { Ban, Log } from '@prisma/client';

export function getAllLogs(): Promise<Log[]> {
  return prisma.log.findMany();
}

export function createLog(message: string) {
  return prisma.log.create({
    data: { message },
  });
}

export function deleteLog(logId: number) {
  return prisma.ban.deleteMany({
    where: {
      id: logId,
    },
  });
}
