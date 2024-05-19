import { compressionOptions, handlePostImage } from '@/modules/PostModule/utils';
import imageCompression from 'browser-image-compression';
import { UseFormReturn } from 'react-hook-form';

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
  files: FileList | null,
  images: string[],
  methods: Methods,
  setLoading: (a: boolean) => void
) => {
  const { setValue, trigger } = methods;
  try {
    setLoading(true);
    if (files && files.length > 0) {
      const image = files[0];
      const resizedImage = await imageCompression(image, compressionOptions);
      if (resizedImage) {
        const formData = new FormData();
        formData.append('image', resizedImage, `${Date.now()}.jpg`);
        const link: any = await handlePostImage(formData);
        const res: string[] = images ? [...images, link] : [link];
        setValue('images', res);
      }
      await trigger(['images']);
    }
  } catch (e) {
    console.log('e', e);
  } finally {
    setLoading(false);
  }
};

export default imageHandler;
