import type { UserDTO } from '@/types';
import { Option } from '@/types/global';
import type { Post, User } from '@prisma/client';
import axios from 'axios';
import { convertLinksToMedia } from '@/utils/convertLinksToMedia';

const postTelegram = async (data: Post, user: UserDTO | User, categories: Option[]) => {
  const { body, price, categoryId, images, userId } = data;
  const categoryLabel = categories.find(x => x.value === Number(categoryId))?.label;

  try {
    const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;
    const text = `Категория: #${categoryLabel}\n\n${bodyText} \nЦена: ${price}\n\nавтор: @${user.username}`;
    const sendPhoto = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup?chat_id=${process.env.NEXT_PUBLIC_CHAT_NAME}`;
    const media = convertLinksToMedia(images.split('||'), text);
    console.log('sendPhoto', sendPhoto);
    await axios.post(sendPhoto, { media });
  } catch (e) {
    console.log(e);
  }
};
export default postTelegram;
