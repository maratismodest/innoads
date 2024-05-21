'use server';
import prisma from '@/lib/prisma';
import { Ban } from '@prisma/client';

export default async function fetchBans(): Promise<Ban[]> {
  const bans = await prisma.ban.findMany();
  return bans;
}
