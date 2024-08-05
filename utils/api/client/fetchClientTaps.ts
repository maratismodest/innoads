import type { Tap } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

export default async function fetchClientTaps(): Promise<Tap[]> {
  const { data } = await clientPrisma.get<Tap[]>(beRoutes.taps);
  return data;
}
