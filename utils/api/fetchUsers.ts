import {UserDTO} from '@/types'

import client, {beRoutes} from './createRequest'

const fetchUsers = async (): Promise<UserDTO[]> => {
  const {data} = await client.get<UserDTO[]>(beRoutes.users)
  return data
}
export default fetchUsers
