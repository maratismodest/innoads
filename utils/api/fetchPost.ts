import axios from 'axios'
import {PostInterface} from "types";

const fetchPost = async (slug: string): Promise<PostInterface> => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
    return res.data
}
export default fetchPost
