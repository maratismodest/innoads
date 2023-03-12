import {CreatePostDTO} from '@/types/PostDTO'

import client, {beRoutes} from './createRequest'

const postAd = async (formData: CreatePostDTO) => {
  const {data} = await client.post(
    beRoutes.ads,
    formData,
  )
  return data
}
export default postAd
