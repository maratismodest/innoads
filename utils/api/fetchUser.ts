import {UserDTO} from '@/types/UserDTO'

import client, {beRoutes} from './createRequest'

type FetchUserDTO = {
  user: UserDTO
}

const fetchUser = async (userId: number): Promise<FetchUserDTO> => {
  const {data} = await client.get<FetchUserDTO>(beRoutes.users + '/' + userId)
  return data
}
export default fetchUser
