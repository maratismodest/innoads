import {PostInterface} from 'types'

import client, {beRoutes} from './createRequest'

const fetchPost = async (slug: string): Promise<PostInterface> => {
  const {data} = await client.get<PostInterface>(beRoutes.posts + '/' + slug)
  return data
}
export default fetchPost
