'use server';
import prisma from '@/lib/prisma';
import { PostDTO } from '@/types';

interface FetchAdsProps {
  content: PostDTO[];
  totalPages: number;
}

interface GetParams {
  size: number;
  page: number;
  userId: number;
  categoryId: number;
}

export default async function fetchAds(params: Partial<GetParams>) {
  const { size = 20, page = 0, categoryId, userId } = params;

  const posts = await prisma.post.findMany({
    skip: size * page,
    take: params.size,
    where: {
      categoryId,
      userId,
    },
  });
  return posts;
}
