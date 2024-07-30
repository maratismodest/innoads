import { Post } from '@prisma/client';
import dayjs from 'dayjs';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import fetchMessage from '@/utils/api/prisma/fetchMessage';
import postMessage from '@/utils/api/prisma/postMessage';
import updatePostPrisma from '@/utils/api/prisma/updatePost';
import commentTelegramPost from '@/utils/api/telegram/commentTelegramPost';
import { routes } from '@/utils/constants';

const success = {
  edit: 'Объявление отредактировано!',
  archive: 'Объявление в архиве!',
};

enum ItemModalText {
  edit = 'Редактировать объявление?',
  archive = 'Объявление не актуально?',
  republish = 'Опубликовать заново?',
}

const handleArchive = async (post: Post, toast: (message: string) => void) => {
  try {
    await updatePostPrisma({ ...post, published: false });
    const message = await fetchMessage(post.id);
    if (message) {
      const comment = await commentTelegramPost(message.id);
      console.log('comment', comment);
      if (comment) {
        const _message = await postMessage({ id: comment.result.message_id, postId: post.id });
        console.log('_message', _message);
      }
    }
    const refetchButton = document.getElementById('refetch-posts');
    if (refetchButton) {
      console.log('refetchButton', refetchButton);
      refetchButton.click();
    }
    toast(success.archive);
  } catch (e) {
    console.error('archive', e);
  }
};

const handleEdit = async (post: Post, router: AppRouterInstance) => {
  try {
    router.push(routes.edit + '/' + post.slug);
  } catch (e) {
    console.error('edit', e);
  }
};

const checkIsOld = (updatedAt: Date, days = 0) => {
  const today = new Date().getTime();
  const current = dayjs(updatedAt).add(days, 'day').toDate().getTime();
  return today > current;
};

export { checkIsOld, handleArchive, handleEdit, ItemModalText };
