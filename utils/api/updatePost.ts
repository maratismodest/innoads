import {EditPostDTO} from 'types/PostDTO'

import client, {beRoutes} from './createRequest'

export const updatePost = async (formData: EditPostDTO) =>
  await client.put(beRoutes.posts + '/' + formData.id,
    formData,
  )
export default updatePost
