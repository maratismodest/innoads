import { CreatePostDTO, PostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

const postAd = async (formData: CreatePostDTO) => {
  const { data } = await client.post<PostDTO>(beRoutes.ads, formData);
  return data;
};
export default postAd;
