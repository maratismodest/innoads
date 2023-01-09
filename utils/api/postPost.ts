import axios from 'axios'
import { InitialPostInterface } from 'interfaces'

const postPost = async (formData: InitialPostInterface) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/posts`,
            formData,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        )
    } catch (e) {
        console.log('e', e)
    }
}
export default postPost;
