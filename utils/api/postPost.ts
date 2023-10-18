import { CreatePostDTO, PostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function postAd(formData: CreatePostDTO) {
  const { data } = await client.post<PostDTO>(beRoutes.ads, formData);
  return data;
};
