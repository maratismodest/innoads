// import fetchMessages from '@/utils/api/client/fetchMessages';
import fetchMessages from '@/utils/api/client/fetchMessages';
import deleteAd from '@/utils/api/prisma/deleteAd';
import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';
// import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';
import type { Post } from '@prisma/client';

export const handleDeleteAllArchived = async (posts: Post[]) => {
  try {
    const _delete = posts.filter(x => !x.published);
    const messages = await fetchMessages();
    console.log('messages', messages);
    for (const post of _delete) {
      const _messages = messages.filter(x => x.postId === post.id);
      for (const _message of _messages) {
        await deleteTelegramPost(_message.id);
        console.log('_message', _message);
      }
      const deleted = await deleteAd(post.id);
      console.warn('deleted', deleted);
    }
  } catch (e) {
    console.error('e', e);
  }
};
