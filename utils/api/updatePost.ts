import {EditPostDTO} from '@/types/PostDTO'

import client, {beRoutes} from './createRequest'

export const updateAd = async (formData: EditPostDTO) =>
  await client.put(beRoutes.ads + '/' + formData.id,
    formData,
  )
export default updateAd
