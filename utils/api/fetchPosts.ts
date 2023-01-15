import axios from 'axios'
import { PostInterface } from 'types'

type FetchPostsProps = {
    content: PostInterface[]
    totalPages: number
}

const fetchPosts = async (categoryId: number = 0, page: number = 0, size: number = 10, userId: number = 0) => {
        const { data } = await axios.get<FetchPostsProps>(`${process.env.NEXT_PUBLIC_API_URL}/posts?categoryId=${categoryId}&page=${page}&size=${size}&userId=${userId}`)
        return data
}
export default fetchPosts
