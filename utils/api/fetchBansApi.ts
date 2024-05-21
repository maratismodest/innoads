import { clientPrisma } from '@/utils/api/createRequest';
import { Ban } from '@prisma/client';

export default async function fetchBansApi(): Promise<Ban[]> {
  const { data } = await clientPrisma.get<Ban[]>('/bans');
  return data;
}
