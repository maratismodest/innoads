import { Option } from '@/types/global';
import { convertLinksToMedia } from '@/utils/convertLinksToMedia';
import type { Post, User } from '@prisma/client';
import axios from 'axios';

export default async function postTelegram(post: Post, user: User, categories: Option[]) {
  const { body, price, categoryId, images, title, userId, slug } = post;
  const categoryLabel = categories.find(x => x.value === Number(categoryId))?.label;

  try {
    const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;
    const text = `Категория: #${categoryLabel}\nЦена: ${price} \n\n${title} \n\n${bodyText} \n\nПодробнее: ${process.env.NEXT_PUBLIC_APP_URL}/post/${slug} \n\nавтор: @${user.username}`;

    const sendPhoto = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup?chat_id=${process.env.NEXT_PUBLIC_CHAT_NAME}`;
    const media = convertLinksToMedia(images.split('||'), text);
    // console.log('sendPhoto', sendPhoto);
    await axios.post(sendPhoto, { media });
  } catch (e) {
    console.log(e);
  }
}
