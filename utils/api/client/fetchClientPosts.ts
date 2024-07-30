import type { Post } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

interface GetPostsParams {
  size: number;
  page: number;
  userId: string;
  categoryId: number;
  published: boolean;
  search?: string;
}

export default async function fetchClientPosts(params: Partial<GetPostsParams>) {
  const { data } = await clientPrisma.get<Post[]>(beRoutes.posts, { params });
  return data;
}
