// import type { Post } from '@prisma/client';

import fetchClientMessages from '@/utils/api/client/fetchClientMessages';
import fetchClientPosts from '@/utils/api/client/fetchClientPosts';
import deleteAd from '@/utils/api/prisma/deleteAd';
import deleteTelegramPost from '@/utils/api/telegram/deleteTelegramPost';

// TODO: delete old posts
// export const handleDeleteAllArchived = async () => {
//   try {
//     const _delete = await fetchClientPosts({ size: 2000 });
//     // console.log('_delete', _delete);
//     const deleted = _delete
//       .sort((a: Post, b: Post) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
//       .slice(0, 100);
//     console.log('delete', deleted);
//     const messages = await fetchClientMessages();
//     console.log('messages', messages);
//     for (const post of deleted) {
//       const _messages = messages.filter(x => x.postId === post.id);
//       for (const _message of _messages) {
//         await deleteTelegramPost(_message.id);
//         console.log('_message', _message);
//       }
//       const deleted = await deleteAd(post.id);
//       console.warn('deleted', deleted);
//     }
//   } catch (e) {
//     console.error('e', e);
//   }
// };

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
