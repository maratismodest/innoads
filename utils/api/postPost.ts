import axios from 'axios'
import {PostFormInterface} from 'types'

const postPost = async (formData: PostFormInterface) => {
    const token = localStorage.getItem('token')

    const {data} = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        formData,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    )
    return data
}
export default postPost
