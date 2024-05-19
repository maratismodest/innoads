'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import moveImage, { MoveImage } from '@/__deprecated__/modules/PostForm/moveImage';
import deleteImage from '@/utils/api/deleteImage';
import { NO_IMAGE } from '@/utils/constants';
import getCompressedImagesLinks from '@/utils/getCompressedImagesLinks';

import Button from '@/components/ui/Button';

interface PostFormImagesProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

const imageErrors = {
  noImages: 'Добавить хотя бы одно фото!',
  manyImages: 'Не больше 4 фотографий!',
};

export default function PostFormImages({ images, setImages }: PostFormImagesProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      imagesValidate();
    }
  }, [loading]);

  const imagesValidate = () => {
    if (images.length === 0) {
      setError(imageErrors.noImages);
    } else if (images.length > 4) {
      setError(imageErrors.manyImages);
    } else {
      setError('');
    }
  };

  const imageHandler = async (event: any) => {
    setLoading(true);
    try {
      if (event.target.files) {
        const imagesFromInput = event.target.files;
        const length = imagesFromInput.length + images.length;
        if (length > 4) {
          return setError(imageErrors.manyImages);
        }
        await getCompressedImagesLinks(imagesFromInput, setImages);
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (current: string) => {
    setLoading(true);
    try {
      const res = images.filter(image => image !== current);
      setImages(res);
      return await deleteImage(current);
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <h4>Добавить фото</h4>
          <div
            className="relative mb-2 aspect-square w-[48%] cursor-pointer hover:shadow lg:mr-2"
            onClick={() => {
              if (ref.current) {
                ref.current.click();
              }
            }}
          >
            <Image
              alt="image"
              src={NO_IMAGE}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <input
          id="upload"
          type="file"
          onChange={imageHandler}
          hidden
          multiple
          accept=".jpg, .jpeg, .png"
          ref={ref}
        />
      </div>
      {!loading && error && <span className="text-red">{error}</span>}
      <h4>Предварительный просмотр</h4>
      <ul className="grid grid-cols-2 gap-4" data-testid="post-form-images">
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
                  await handleDeleteImage(image);
                }}
              >
                &times;
              </Button>
            </li>
          );
        })}
        {loading && (
          <li className={clsx('relative aspect-square cursor-pointer shadow hover:shadow-2xl')}>
            <p className="flex h-full items-center justify-center p-4 text-center text-red">
              Загружаем изображение
            </p>
          </li>
        )}
      </ul>
    </>
  );
}
