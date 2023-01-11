import axios from 'axios'

const fetchPost = async (slug: string) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
    return res.data
}
export default fetchPost
