import { PostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function fetchAd(slug: string): Promise<PostDTO> {
  const { data } = await client.get<PostDTO>(beRoutes.ads + '/' + slug);
  return data;
}
