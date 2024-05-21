import { clientTelegram } from '@/api/createRequest';
import { getFormattedPrice } from '@/components/Price/utils';
import { CreatePostDTO, EditPostDTO } from '@/types';
import { Option } from '@/types/global';
import { convertLinksToMedia } from '@/utils/convertLinksToMedia';
import type { Post, User } from '@prisma/client';

export interface TelegramResponseProps {
  ok: boolean;
  result: {
    caption: string;
    // caption_entities: {}[];
    date: number;
    message_id: number;
    // photo: {}[];
    sender_chat: {
      id: number; //what we need!
      title: string; //"SofiaBoard"
      type: string; // "channel"
      username: string; //sofiaboard;
    };
  }[];
}

export default async function postTelegram(
  post: Post | CreatePostDTO | EditPostDTO,
  user: User,
  categories: Option[]
) {
  const { body, price, categoryId, images, title, userId, slug, published } = post;
  const categoryLabel = categories.find(x => x.value === Number(categoryId))?.label;

  try {
    const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;
    // const text = `Категория: #${categoryLabel} \n${title} \nЦена: <b>${getFormattedPrice(price)}</b> \n\n${bodyText} \n\n${published ? `Подробнее: ${process.env.NEXT_PUBLIC_APP_URL}/post/${slug} \n\n` : ''} автор: @${user.username}`;
    const text = `Категория: #${categoryLabel} \n${title} \nЦена: <b>${getFormattedPrice(price)}</b> \n\n${bodyText} \n\nавтор: @${user.username}`;

    const sendPhoto = `/sendMediaGroup?chat_id=${process.env.NEXT_PUBLIC_CHAT_NAME}`;
    const media = convertLinksToMedia(images.split('||'), text);
    const { data } = await clientTelegram.post<TelegramResponseProps>(sendPhoto, { media });
    console.log('data', data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
