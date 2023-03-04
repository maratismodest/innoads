import {UserProps} from 'types'

import client, {beRoutes} from './createRequest'

type FetchUserProps = {
  user: UserProps
}

const fetchUser = async (userId: number): Promise<FetchUserProps> => {
  const {data} = await client.get<FetchUserProps>(beRoutes.users + '/' + userId)
  return data
}
export default fetchUser
