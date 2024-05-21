import moveImage, { MoveImage } from '@/modules/PostModule/ImagesModule/moveImage';
import Button from '@/components/ui/Button';
import deleteImageByFilename from '@/api/deleteImageByFilename';
import { NO_IMAGE } from '@/utils/constants';
import Image from 'next/image';
import React from 'react';

const regexpAfterLastSlash = /([^\/]+$)/gm;

export const getNameFromUrl = (url: string) => {
  return url.match(regexpAfterLastSlash)?.[0];
};

interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImagesModulePreview = ({ images, setImages }: Props) => {
  const _deleteImage = async (current: string) => {
    setImages(images.filter(x => x !== current));
    const filename = getNameFromUrl(current);
    if (filename) {
      console.log('filename', filename);
      return await deleteImageByFilename(filename);
    }
  };
  return (
    <>
      <label>Предварительный просмотр</label>
      <ul className="relative grid grid-cols-2 gap-4">
        {images.map((image: string, index: number) => {
          return (
            <li
              key={image}
              className="relative aspect-square cursor-pointer shadow hover:shadow-2xl"
            >
              <Image
                alt={image}
                src={image}
                style={{
                  objectFit: 'cover',
                }}
                fill={true}
                placeholder="blur"
                blurDataURL={NO_IMAGE}
              />
              <Button
                className="absolute left-0 top-1/2 -translate-y-1/2"
                onClick={e => {
                  moveImage(e, images, index, MoveImage.left, setImages);
                }}
              >
                &larr;
              </Button>
              <Button
                className="absolute right-0 top-1/2 -translate-y-1/2	"
                onClick={e => {
                  moveImage(e, images, index, MoveImage.right, setImages);
                }}
              >
                &rarr;
              </Button>
              <Button
                className="absolute right-0 top-0"
                onClick={async () => {
                  await _deleteImage(image);
                }}
              >
                &times;
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImagesModulePreview;
