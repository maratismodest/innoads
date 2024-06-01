import { beRoutes, clientPrisma } from '@/utils/api/createRequest';
import type { Post } from '@prisma/client';

export default async function fetchApiPost(slug: string) {
  const { data } = await clientPrisma.get<Post>(beRoutes.posts + '/' + slug);
  return data;
}
