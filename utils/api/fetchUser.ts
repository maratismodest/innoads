import axios from 'axios'
import process from 'process'
import { UserProps } from 'types'

import client from './createRequest'

type FetchUserProps = {
    user: UserProps
}

const fetchUser = async (userId: number): Promise<FetchUserProps> => {
    const { data } = await client.get<FetchUserProps>(`/users/` + userId)
    return data
}
export default fetchUser
