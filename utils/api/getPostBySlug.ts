import axios from 'axios'

const getPostBySlug = async (slug: string) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
        return res
    } catch (e) {
        console.log('e', e)
    }
}
export default getPostBySlug
