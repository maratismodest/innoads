import type { Message } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

export default async function fetchClientMessages(): Promise<Message[]> {
  const { data } = await clientPrisma.get<Message[]>(beRoutes.messages);
  return data;
}
