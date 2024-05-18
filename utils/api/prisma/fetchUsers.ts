import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export default async function fetchUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}
