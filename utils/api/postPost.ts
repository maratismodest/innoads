import { PostFormInterface } from 'types'

import client from './createRequest'

const postPost = async (formData: PostFormInterface) => {
    // const token = localStorage.getItem('token')

    const { data } = await client.post(
        `/posts`,
        formData,
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     },
        // },
    )
    return data
}
export default postPost
