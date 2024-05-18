import { UserDTO } from '@/types';

import client, { beRoutes } from '../createRequest';

export default async function fetchUser(userId: number): Promise<UserDTO> {
  const { data } = await client.get<UserDTO>(beRoutes.users + '/' + userId);
  return data;
}
