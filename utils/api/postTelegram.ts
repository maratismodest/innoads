import {PostTelegramDTO} from 'types/TelegramDTO'

import client, {beRoutes} from './createRequest'

export const postTelegram = async (formData: PostTelegramDTO) =>
  await client.post(
    beRoutes.telegrams,
    formData,
  )
export default postTelegram
