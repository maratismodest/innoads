import { UserProps } from 'types'

import client, {beRoutes} from './createRequest'

const fetchUsers = async (): Promise<UserProps[]> => {
    const { data } = await client.get<UserProps[]>(beRoutes.users)
    return data
}
export default fetchUsers
