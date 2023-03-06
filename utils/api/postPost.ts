import {CreatePostDTO} from '@/types/PostDTO'

import client, {beRoutes} from './createRequest'

const postPost = async (formData: CreatePostDTO) => {
  const {data} = await client.post(
    beRoutes.posts,
    formData,
  )
  return data
}
export default postPost
