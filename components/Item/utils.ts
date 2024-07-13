import fetchMessage from '@/utils/api/prisma/fetchMessage';
import updatePostPrisma from '@/utils/api/prisma/updatePost';
import commentPost from '@/utils/api/telegram/commentPost';
import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const success = {
  edit: 'Объявление отредактировано!',
  archive: 'Объявление в архиве!',
};

const errors = {
  noCase: 'Нет таких значений',
};

enum ItemModalText {
  edit = 'Редактировать объявление?',
  archive = 'Объявление не актуально?',
  republish = 'Опубликовать заново?',
}

const handleArchive = async (post: Post, toast: (message: string) => void) => {
  try {
    const unpublished = await updatePostPrisma({ ...post, published: false });
    console.log('unpublished', unpublished);
    const message = await fetchMessage(post.id);
    if (message) {
      const comment = await commentPost(message.id);
      console.log('comment', comment);
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

export { success, errors, ItemModalText, handleArchive, handleEdit };
