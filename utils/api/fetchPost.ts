import { PostInterface } from 'types'

import client from './createRequest'

const fetchPost = async (slug: string): Promise<PostInterface> => {
    const { data } = await client.get('/posts/' + slug)
    return data
}
export default fetchPost
