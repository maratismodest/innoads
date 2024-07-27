import type { Ban } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

export default async function fetchClientBans(): Promise<Ban[]> {
  const { data } = await clientPrisma.get<Ban[]>(beRoutes.bans);
  return data;
}
