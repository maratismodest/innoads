import type { User } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

interface GetUsersParams {
  search?: string;
}

export default async function fetchClientUsers(params: Partial<GetUsersParams>): Promise<User[]> {
  const { data } = await clientPrisma.get<User[]>(beRoutes.users, { params });
  return data;
}
