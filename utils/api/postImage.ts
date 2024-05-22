import client, { beRoutes } from './createRequest';

interface PostImageProps {
  status: 'ok' | 'error';
  value: string;
}

export default async function postImage(formData: FormData): Promise<PostImageProps> {
  try {
    const res = await client.post(beRoutes.uploads, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      status: 'ok',
      value: res.data.link as string,
    };
  } catch (e) {
    console.log(e);
    return {
      status: 'error',
      value: 'Что-то пошло не так при отправке изображения',
    };
  }
}
