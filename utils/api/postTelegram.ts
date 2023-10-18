import { TelegramPostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function postTelegram(formData: TelegramPostDTO) {
  const { data } = await client.post(beRoutes.telegrams, formData);
  return data;
}
