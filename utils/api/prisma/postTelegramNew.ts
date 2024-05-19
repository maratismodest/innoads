import { CreatePostDTO, EditPostDTO } from '@/types';
import { Option } from '@/types/global';
import { convertLinksToMediaNew } from '@/utils/convertLinksToMediaNew';
import type { Post, User } from '@prisma/client';
import axios from 'axios';

export default async function postTelegramNew(
  post: Post | CreatePostDTO | EditPostDTO,
  user: User,
  categories: Option[]
) {
  const { body, price, categoryId, images, title, userId, slug, published } = post;
  const categoryLabel = categories.find(x => x.value === Number(categoryId))?.label;

  try {
    const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;
    // const text = `Категория: #${categoryLabel}\n\n${bodyText} \nЦена: ${price}\n\nавтор: @${user.username}`;
    const text = `Категория: #${categoryLabel} \n<u>${title}</u> \nЦена: <b>${price}</b> \n\n${bodyText} \n\n${published ? `Подробнее: ${process.env.NEXT_PUBLIC_APP_URL}/post/${slug} \n\n` : ''} автор: @${user.username}`;

    const sendPhoto = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup?chat_id=${process.env.NEXT_PUBLIC_CHAT_NAME}`;
    const media = convertLinksToMediaNew(images.split('||'), text);
    // console.log('sendPhoto', sendPhoto);
    await axios.post(sendPhoto, { media });
  } catch (e) {
    console.log(e);
  }
}
