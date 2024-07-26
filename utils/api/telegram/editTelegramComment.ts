'use server';
import { clientTelegram } from '@/utils/api/createRequest';
import { tgRoutes } from '@/utils/constants';

export default async function editTelegramComment(messageId: number, text: string = 'изменен') {
  try {
    const { data } = await clientTelegram.post(tgRoutes.editMessageText, {
      chat_id: process.env.NEXT_PUBLIC_CHAT_NAME,
      text: `<u>Статус: ${text}</u>`,
      message_id: messageId,
      parse_mode: 'HTML',
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}
