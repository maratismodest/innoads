'use server';
import prisma from '@/lib/prisma';

export default async function fetchTap(userId: string) {
  try {
    const tap = await prisma.tap.findFirst({
      where: { userId: userId },
    });
    return tap;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}
