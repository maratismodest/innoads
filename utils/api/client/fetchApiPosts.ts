import { beRoutes, clientPrisma } from '@/utils/api/createRequest';
import { Post } from '@prisma/client';

export interface GetPostsParams {
  size: number;
  page: number;
  userId: string;
  categoryId: number;
  published: boolean;
  search?: string;
}

export default async function fetchApiPosts(params: Partial<GetPostsParams>) {
  const { data } = await clientPrisma.get<Post[]>(beRoutes.posts, { params });
  return data;
}
