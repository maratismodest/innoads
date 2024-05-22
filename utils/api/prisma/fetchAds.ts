'use server';
import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';

export interface GetPostsParams {
  size: number;
  page: number;
  userId: string;
  categoryId: number;
  published: boolean;
}

export default async function fetchPosts(params: Partial<GetPostsParams>): Promise<Post[]> {
  const { size = 20, page = 0, categoryId, userId, published } = params;

  const posts = await prisma.post.findMany({
    skip: size * page,
    take: params.size,
    where: {
      categoryId,
      userId,
      published,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}
