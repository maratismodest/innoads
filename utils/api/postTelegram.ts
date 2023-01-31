import { PostFormInterface } from 'types'

import client from './createRequest'

export const postTelegram = async (formData: PostFormInterface) => {
    // const token = localStorage.getItem('token')
    const res = await client.post(
        `/telegrams`,
        formData,
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     },
        // },
    )
    return res
}
export default postTelegram
