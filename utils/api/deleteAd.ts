import client, { beRoutes } from './createRequest';

export default async function deleteAd(id: number) {
  const { data } = await client.delete(`${beRoutes.ads}/${id}`);
  return data;
}
