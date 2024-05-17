'use server';
import prisma from '@/lib/prisma';

export default async function fetchAd(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      user: true,
    },
  });
  return post;
}
