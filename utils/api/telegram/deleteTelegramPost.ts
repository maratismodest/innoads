'use server';
import { clientTelegram } from '@/utils/api/createRequest';
import { tgRoutes } from '@/utils/constants';

export default async function deleteTelegramPost(messageId: number) {
  try {
    const { data } = await clientTelegram.post(tgRoutes.deleteMessage, {
      chat_id: process.env.NEXT_PUBLIC_CHAT_NAME,
      message_id: messageId,
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}
