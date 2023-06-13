import { UserDTO } from '@/types';

import client, { beRoutes } from './createRequest';

const fetchUser = async (userId: number): Promise<UserDTO> => {
  const { data } = await client.get<UserDTO>(beRoutes.users + '/' + userId);
  return data;
};
export default fetchUser;
