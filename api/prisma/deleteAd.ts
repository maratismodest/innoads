'use server';
import prisma from '@/lib/prisma';
import { getNameFromUrl } from '@/modules/PostModule/ImagesModule/ImagesModulePreview';
import deleteImageByFilename from '@/api/deleteImageByFilename';

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
      const numFruit = await deleteImageByFilename(filename);
      return numFruit;
    }
  });

  return post;
}
