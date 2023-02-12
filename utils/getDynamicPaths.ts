import { PostInterface } from 'types'

import client from './api/createRequest'
import { FetchPostsProps } from './api/fetchPosts'

export const getDynamicPaths = async (count: number = 12): Promise<PostInterface[]> => {
    try {
        const { data } = await client.get<FetchPostsProps>(`/posts?size=${count}`)
        return data.content
    } catch (e) {
        console.log(e)
        return []
    }
}
