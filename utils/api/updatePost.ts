import { EditPostInterface } from 'types'

import client from './createRequest'

export const updatePost = async (formData: EditPostInterface) => {
    // const token = localStorage.getItem('token')
    const res = await client.put(
        `/posts/` + formData.id,
        formData,
        // {
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     },
        // },
    )
    return res
}
export default updatePost
