import axios from 'axios'
import process from 'process'
import { UserProps } from 'types'

// type FetchUsersProps = {
//     users: UserProps[]
// }

const fetchUsers = async (): Promise<UserProps[]> => {
    const { data } = await axios.get<UserProps[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    return data
}
export default fetchUsers
