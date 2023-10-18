import { UserDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function fetchUsers(): Promise<UserDTO[]> {
  const { data } = await client.get<UserDTO[]>(beRoutes.users);
  return data;
};
