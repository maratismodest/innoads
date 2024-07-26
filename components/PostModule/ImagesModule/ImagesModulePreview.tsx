import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import moveImage, { MoveImage } from '@/components/PostModule/ImagesModule/moveImage';
import buttonStyles from '@/styles/buttonStyles';
import deleteImageByFilename from '@/utils/api/backend/deleteImageByFilename';
import { NO_IMAGE } from '@/utils/constants';

const regexpAfterLastSlash = /([^\/]+$)/gm;

export const getNameFromUrl = (url: string) => {
  return url.match(regexpAfterLastSlash)?.[0];
};

interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImagesModulePreview = ({ images, setImages }: Props) => {
  const handleDeleteImage = async (current: string) => {
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
        {images.map((image, index) => {
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
              <button
                type="button"
                className={clsx(
                  buttonStyles(),
                  'absolute left-0 top-1/2 -translate-y-1/2',
                  index === 0 && 'hidden'
                )}
                onClick={() => {
                  const res = moveImage(images, index, MoveImage.left);
                  setImages(res);
                }}
              >
                &larr;
              </button>
              <button
                type="button"
                className={clsx(
                  buttonStyles(),
                  'absolute right-0 top-1/2 -translate-y-1/2',
                  index === images.length - 1 && 'hidden'
                )}
                onClick={() => {
                  const res = moveImage(images, index, MoveImage.right);
                  setImages(res);
                }}
              >
                &rarr;
              </button>
              <button
                className={clsx(buttonStyles(), 'absolute right-0 top-0')}
                onClick={async () => {
                  await handleDeleteImage(image);
                }}
              >
                &times;
              </button>
              <span className={clsx('count', 'absolute bottom-0 left-0 z-10')}>{index + 1}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImagesModulePreview;
