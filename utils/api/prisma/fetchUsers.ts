'use server';
import { User } from '@prisma/client';

import prisma from '@/lib/prisma';

interface GetUsersParams {
  search?: string;
}

export default async function fetchUsers(params: Partial<GetUsersParams>): Promise<User[]> {
  const { search } = params;
  const users = await prisma.user.findMany({
    where: {
      username: {
        search: search && search + ':*',
      },
    },
  });
  return users;
}
