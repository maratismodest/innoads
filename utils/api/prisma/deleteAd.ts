'use server';
import prisma from '@/lib/prisma';
import { getNameFromUrl } from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import deleteImageByFilename from '@/utils/api/backend/deleteImageByFilename';

export default async function deleteAd(id: number) {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  const _images = post.images.split('||');

  _images.map(async image => {
    const filename = getNameFromUrl(image);
    if (filename) {
      const file = await deleteImageByFilename(filename);
      return file;
    }
  });

  return post;
}
