'use server';
import { clientTelegram } from '@/utils/api/createRequest';

export default async function editComment(messageId: number, text: string = 'изменен') {
  try {
    const { data } = await clientTelegram.post('/editMessageText', {
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
