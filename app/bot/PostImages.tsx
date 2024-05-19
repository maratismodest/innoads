import { handleDeleteImage } from '@/app/bot/_utils';
import Button from '@/components/ui/Button';
import moveImage, { MoveImage } from '@/modules/PostForm/moveImage';
import { NO_IMAGE } from '@/utils/constants';
import React from 'react';
import Image from 'next/image';
interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

const PostImages = ({ images, setImages }: Props) => {
  const deleteImage = async (current: string) => {
    setImages(images.filter(x => x !== current));
    return await handleDeleteImage(current);
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
                  await deleteImage(image);
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

export default PostImages;
