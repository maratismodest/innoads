'use server';
import { createBan } from '@/prisma/services/bans';

export default async function createBanPrisma(userId: bigint) {
  return createBan(userId);
}
