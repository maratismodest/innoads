import axios from 'axios'
import {PostFormInterface} from 'types'

export const postTelegram = async (formData: PostFormInterface) => {
    const token = localStorage.getItem('token')
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/telegrams`,
        formData,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    )
    return res
}
export default postTelegram
