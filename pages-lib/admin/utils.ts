import deleteAd from '@/utils/api/prisma/deleteAd';
import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';
import { Post } from '@prisma/client';

export const handleDeleteAllArchived = async (posts: Post[]) => {
  try {
    if (posts) {
      const _delete = posts.filter(x => !x.published);
      for (const post of _delete) {
        // @ts-ignore
        if (post.messages?.length > 0) {
          // @ts-ignore
          await deleteTelegramPost(post.messages[0].id);
        }
        const deleted = await deleteAd(post.id);
        console.warn('deleted', deleted);
      }
    }
  } catch (e) {
    console.error('e', e);
  }
};
