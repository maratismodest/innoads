'use server';
import { clientTelegram } from '@/utils/api/createRequest';
import { tgRoutes } from '@/utils/constants';

export default async function commentTelegramPost(
  messageId: number,
  text: string = '<u>Это объявление снято с публикации</u>'
) {
  try {
    const { data } = await clientTelegram.post(tgRoutes.sendMessage, {
      chat_id: process.env.NEXT_PUBLIC_CHAT_NAME,
      text: text,
      reply_to_message_id: messageId,
      parse_mode: 'HTML',
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}
