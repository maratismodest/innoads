'use server';
import { deleteBan } from '@/prisma/services/bans';

export default async function deleteBanPrisma(userId: number) {
  return await deleteBan(userId);
}
