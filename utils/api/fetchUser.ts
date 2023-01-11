import axios from 'axios'
import { UserType } from 'interfaces'
import process from 'process'

type FetchUserProps = {
    user: UserType
}

const fetchUser = async (userId: number): Promise<FetchUserProps> => {
    const { data } = await axios.get<FetchUserProps>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
    return data
}
export default fetchUser
