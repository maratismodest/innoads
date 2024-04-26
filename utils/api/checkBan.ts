import { BanDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function checkBan(userId: number): Promise<BanDTO | null> {
  const { data } = await client.get<BanDTO>(beRoutes.ban + '/' + userId);
  return data;
}
