import fetchApiPosts from '@/utils/api/client/fetchApiPosts';
import fetchMessages from '@/utils/api/client/fetchMessages';
import deleteAd from '@/utils/api/prisma/deleteAd';
import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';

export const handleDeleteAllArchived = async () => {
  try {
    const unpublished = await fetchApiPosts({ size: 1000, published: false });
    console.log('unpublished', unpublished);
    const messages = await fetchMessages();
    console.log('messages', messages);
    for (const post of unpublished) {
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
