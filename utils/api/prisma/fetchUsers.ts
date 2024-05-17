import prisma from '@/lib/prisma';
import { UserDTO } from '@/types';
import { User } from '@prisma/client';

export default async function fetchUsers(): Promise<UserDTO[] | User[]> {
  const users = await prisma.user.findMany();
  return users;
}
