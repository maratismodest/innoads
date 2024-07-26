import { UseFormReturn } from 'react-hook-form';

import { handleImageResize, handlePostImage } from '@/components/PostModule/utils';

export type Methods = UseFormReturn<{
  agreement?: boolean | undefined;
  post?: boolean | undefined;
  categoryId: number;
  price: number;
  title: string;
  body: string;
  images: (string | undefined)[];
}>;

const imageHandler = async (
  file: File,
  images: string[],
  methods: Methods,
  setLoading: (a: boolean) => void
) => {
  const { setValue, trigger } = methods;
  try {
    setLoading(true);
    const resizedImage = await handleImageResize(file);
    if (resizedImage) {
      const formData = new FormData();
      const fileName = `${Date.now()}_${resizedImage.name.replace(/ /g, '_')}`;
      formData.append('image', resizedImage, fileName);
      const link: string = await handlePostImage(formData);
      const res = images ? [...images, link] : [link];
      setValue('images', res);
    }
    await trigger(['images']);
  } catch (e) {
    console.log('e', e);
  } finally {
    setLoading(false);
  }
};

export default imageHandler;
