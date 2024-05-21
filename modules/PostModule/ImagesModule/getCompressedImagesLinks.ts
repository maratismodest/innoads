import React, { Dispatch } from 'react';
import postImage from '@/utils/api/postImage';
import handleImageResize from '@/utils/handleImageResize';

export default async function getCompressedImagesLinks(
  imagesFromInput: FileList,
  setImages: Dispatch<React.SetStateAction<string[]>>
) {
  for (let i = 0; i < imagesFromInput.length; i++) {
    const initialImage: File = imagesFromInput[i];
    const resizedImage = await handleImageResize(initialImage);
    if (resizedImage) {
      const formData = new FormData();
      formData.append('image', resizedImage, resizedImage.name);
      const { status, value } = await postImage(formData);
      if (status === 'ok') {
        setImages((prevState: string[]) => [...prevState, value]);
      }
    }
  }
}
