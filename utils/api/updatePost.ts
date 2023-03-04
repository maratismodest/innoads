import {EditPostInterface} from 'types'

import client, {beRoutes} from './createRequest'

export const updatePost = async (formData: EditPostInterface) =>
  await client.put(beRoutes.posts + '/' + formData.id,
    formData,
  )
export default updatePost
