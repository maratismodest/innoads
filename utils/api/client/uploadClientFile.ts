import { beRoutes, clientPrisma } from '@/utils/api/createRequest';

interface UploadResponse {
  // Define the structure of your upload response here
  message: string;
  link: string; // Add the property for the uploaded file's link'
  // Add other properties as needed
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
