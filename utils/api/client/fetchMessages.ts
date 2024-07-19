import { beRoutes, clientPrisma } from '@/utils/api/createRequest';
import type { Message } from '@prisma/client';

export default async function fetchMessages(): Promise<Message[]> {
  const { data } = await clientPrisma.get<Message[]>(beRoutes.messages);
  return data;
}
