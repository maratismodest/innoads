import {PostDTO} from '@/types'

import client, {beRoutes} from './createRequest'

const fetchAd = async (slug: string): Promise<PostDTO> => {
  const {data} = await client.get<PostDTO>(beRoutes.ads + '/' + slug)
  return data
}
export default fetchAd
