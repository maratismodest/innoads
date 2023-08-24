import client from './createRequest';

export default async function deleteImage  (filename: string)  {
  const { data } = await client.delete(filename);
  return data;
};
