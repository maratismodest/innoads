import client from './createRequest';

const deleteImage = async (filename: string) => {
  const { data } = await client.delete(filename);
  return data;
};

export default deleteImage;
