'use server';
import prisma from '@/lib/prisma';

export default async function deleteAd(id: number) {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return post;
}
