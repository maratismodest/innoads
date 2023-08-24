import {EditPostDTO} from '@/types';

import client, {beRoutes} from './createRequest';

export default async function updateAd(formData: EditPostDTO) {
  const {data} = await client.put(beRoutes.ads + '/' + formData.id, formData);
  return data
}
