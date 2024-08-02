'use server';
import type { Ban } from '@prisma/client';

import prisma from '@/lib/prisma';

export default async function fetchBans(): Promise<Ban[]> {
  const bans = await prisma.ban.findMany();
  return bans;
}
