import { PostDTO } from '@/types';

import client, { beRoutes } from '../createRequest';

interface GetParams {
  categoryId: number;
}

export default async function fetchRelatedAds(params: GetParams) {
  const { data } = await client.get<PostDTO[]>(beRoutes.ads + '/related', { params });
  return data;
}
