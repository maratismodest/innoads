import { UserProps } from 'types'

import client from './createRequest'

const fetchUsers = async (): Promise<UserProps[]> => {
    const { data } = await client.get<UserProps[]>(`/users`)
    return data
}
export default fetchUsers
