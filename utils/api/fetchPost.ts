import {PostDTO} from '@/types/PostDTO'

import client, {beRoutes} from './createRequest'

const fetchPost = async (slug: string): Promise<PostDTO> => {
  const {data} = await client.get<PostDTO>(beRoutes.posts + '/' + slug)
  return data
}
export default fetchPost
