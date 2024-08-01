import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

interface UploadResponse {
  message: string;
  link: string;
}

export async function uploadClientFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await clientPrisma.post(beRoutes.uploads, formData);
  console.log('data', data);
  if (!data.link) {
    throw new Error('Upload failed');
  }

  return data;
}
