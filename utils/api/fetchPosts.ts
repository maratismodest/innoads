import { PostInterface } from 'types'

import client from './createRequest'

export type FetchPostsProps = {
    content: PostInterface[]
    totalPages: number
}

const fetchPosts = async (options: Record<string, number>) => {
    const keys = Object.keys(options)
    const params = keys.length > 0 ? ('/?' + keys.map(key => `${key}=${options[key]}`).join('&')) : ''

    const { data } = await client.get<FetchPostsProps>(`/posts` + params)
    return data
}
export default fetchPosts
