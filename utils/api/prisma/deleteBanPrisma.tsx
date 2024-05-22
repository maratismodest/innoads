'use server';
import { deleteBan } from '@/prisma/services/bans';

export default async function deleteBanPrisma(userId: bigint) {
  return await deleteBan(userId);
}
