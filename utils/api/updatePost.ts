import axios from 'axios'
import { PostInterface } from 'interfaces'

export const updatePost = async (formData: PostInterface) => {
    const token = localStorage.getItem('token')
    const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${formData.id}`,
        formData,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    )
    return res
}
export default updatePost
