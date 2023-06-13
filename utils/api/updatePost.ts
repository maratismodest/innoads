import { EditPostDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function updateAd(formData: EditPostDTO) {
  return await client.put(beRoutes.ads + '/' + formData.id, formData);
}
