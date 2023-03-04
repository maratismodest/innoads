import {PostFormInterface} from 'types'

import client, {beRoutes} from './createRequest'

const postPost = async (formData: PostFormInterface) => {
  const {data} = await client.post(
    beRoutes.posts,
    formData,
  )
  return data
}
export default postPost
