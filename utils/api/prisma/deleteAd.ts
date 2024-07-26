'use server';
import prisma from '@/lib/prisma';
import deleteImageByFilename from '@/utils/api/backend/deleteImageByFilename';
import { getNameFromUrl } from '@/components/PostModule/ImagesModule/ImagesModulePreview';

export default async function deleteAd(id: number) {
  const messages = await prisma.message.deleteMany({
    where: {
      postId: id,
    },
  });

  console.warn('messages', messages);

  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  console.warn('post', post);

  const _images = post.images.split('||');

  _images.map(async image => {
    const filename = getNameFromUrl(image);
    if (filename) {
      const file = await deleteImageByFilename(filename);
      console.warn('image', file);
      return file;
    }
  });

  return post;
}
