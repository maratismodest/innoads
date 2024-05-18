'use server';
import { createBan } from '@/prisma/services/bans';

export default async function createBanPrisma(userId: number) {
  return await createBan(userId);
}
