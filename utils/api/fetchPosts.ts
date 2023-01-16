import axios from 'axios'
import { PostInterface } from 'types'

type FetchPostsProps = {
    content: PostInterface[]
    totalPages: number
}

const fetchPosts = async (options: Record<string, number>) => {
    const keys = Object.keys(options)
    const params = keys.length > 0 ? ('/?' + keys.map(key => `${key}=${options[key]}`).join('&')) : ''

    const { data } = await axios.get<FetchPostsProps>(`${process.env.NEXT_PUBLIC_API_URL}/posts` + params)
    return data
}
export default fetchPosts
