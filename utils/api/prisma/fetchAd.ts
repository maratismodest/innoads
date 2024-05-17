'use server';
import prisma from '@/lib/prisma';

export default async function fetchAd(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        user: true,
      },
    });
    return post;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}
