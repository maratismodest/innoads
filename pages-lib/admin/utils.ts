import fetchClientMessages from '@/utils/api/client/fetchClientMessages';
import fetchClientPosts from '@/utils/api/client/fetchClientPosts';
import deleteAd from '@/utils/api/prisma/deleteAd';
import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';

export const handleDeleteAllArchived = async () => {
  try {
    const unpublished = await fetchClientPosts({ size: 1000, published: false });
    console.log('unpublished', unpublished);
    const messages = await fetchClientMessages();
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
