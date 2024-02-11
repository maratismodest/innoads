import { PostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

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
  const { data } = await client.get<FetchAdsProps>(beRoutes.ads, { params });
  return data;
}
