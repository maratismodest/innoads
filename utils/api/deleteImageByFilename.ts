import client, { beRoutes } from './createRequest';

export default async function deleteImageByFilename(filename: string) {
  const { data } = await client.delete(beRoutes.uploads + '/' + filename);
  console.log('data', data);
  return data;
}
