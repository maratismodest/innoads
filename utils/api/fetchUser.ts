import axios from 'axios'
import process from 'process'
import {UserProps} from "types";

type FetchUserProps = {
    user: UserProps
}

const fetchUser = async (userId: number): Promise<FetchUserProps> => {
    const {data} = await axios.get<FetchUserProps>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
    return data
}
export default fetchUser
