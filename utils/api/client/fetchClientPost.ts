import type { Post } from '@prisma/client';

import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

export default async function fetchClientPost(slug: string) {
  const { data } = await clientPrisma.get<Post>(beRoutes.posts + '/' + slug);
  return data;
}
