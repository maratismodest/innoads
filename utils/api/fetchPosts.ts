import {PostDTO} from '@/types/PostDTO'

import client, {beRoutes} from './createRequest'

export type FetchPostsProps = {
  content: PostDTO[]
  totalPages: number
}

const fetchPosts = async (options: Record<string, number>) => {
  const keys = Object.keys(options)
  const params = keys.length > 0 ? ('/?' + keys.map(key => `${key}=${options[key]}`).join('&')) : ''

  const {data} = await client.get<FetchPostsProps>(beRoutes.posts + params)
  return data
}
export default fetchPosts
