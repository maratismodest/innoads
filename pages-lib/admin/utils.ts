import deleteAd from '@/utils/api/prisma/deleteAd';
import { Post } from '@prisma/client';

export const handleDeleteAllArchived = async (posts: Post[]) => {
  try {
    if (posts) {
      const _delete = posts.filter(x => !x.published);
      for (const post of _delete) {
        const deleted = await deleteAd(post.id);
        console.warn('deleted', deleted);
      }
    }
  } catch (e) {
    console.error('e', e);
  }
};
