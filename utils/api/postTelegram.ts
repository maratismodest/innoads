import { TelegramPostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export const postTelegram = async (formData: TelegramPostDTO) =>
  await client.post(
    beRoutes.telegrams,
    formData
  );
export default postTelegram;
