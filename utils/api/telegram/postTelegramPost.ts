import type { Post, User } from '@prisma/client';

import { getFormattedPrice } from '@/components/Price/utils';
import type { CreatePostDTO, EditPostDTO, Option } from '@/types';
import { clientTelegram } from '@/utils/api/createRequest';
import { routes, tgRoutes } from '@/utils/constants';
import { convertLinksToMedia } from '@/utils/telegram/convertLinksToMedia';

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

export default async function postTelegramPost(
  post: Post | CreatePostDTO | EditPostDTO,
  user: User,
  categories: Option[]
) {
  const { body, price, categoryId, images, title, userId, slug, published } = post;
  const categoryLabel = categories.find(x => x.value === Number(categoryId))?.label;
  const url = process.env.NEXT_PUBLIC_APP_URL + routes.post + '/' + slug;
  const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;

  try {
    const text = `${categoryLabel} \n<a href='${url}'>${title}</a> \nЦена: <b>${getFormattedPrice(price)}</b> \n\n💬 ${bodyText} \n\n👤 @${user.username}`;

    const sendPhoto = `${tgRoutes.sendMediaGroup}`;
    const media = convertLinksToMedia(images.split('||'), text);

    const { data } = await clientTelegram.post<TelegramResponseProps>(
      sendPhoto,
      { media },
      { params: { chat_id: process.env.NEXT_PUBLIC_CHAT_NAME } }
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
