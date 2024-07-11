import useToast from '@/hooks/useToast';
import { imagesCount, tooManyImages } from './ImagesModule.constans';
import { ACCEPTED_IMAGE_FORMAT } from '@/modules/PostModule/utils';
import { NO_IMAGE } from '@/utils/constants';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef } from 'react';
import { Methods } from './utils';

type Props = {
  images: string[];
  imageHandler: (file: File) => Promise<void>;
  methods: Methods;
};

const ImagesModuleInput = ({ images, imageHandler, methods }: Props) => {
  const { toast } = useToast();
  const ref = useRef<HTMLInputElement>(null);
  const { register, formState, setValue } = methods;
  const { errors } = formState;

  const handleClick = () => {
    if (images.length < imagesCount) {
      ref.current && ref.current.click();
    } else {
      toast(tooManyImages);
    }
  };

  return (
    <div>
      <label htmlFor="image-uploader">Добавить фото (по одному, но не более {imagesCount})</label>
      <input
        id="image-uploader"
        type="file"
        {...register('images')}
        name="images"
        onChange={async event => {
          if (event.target.files?.length) {
            await imageHandler(event.target.files[0]);
          }
        }}
        hidden
        ref={ref}
        multiple={false}
        accept={ACCEPTED_IMAGE_FORMAT}
      />
      <button
        type="button"
        className={clsx(
          'relative mb-2 aspect-square w-[48%] hover:shadow',
          images.length < imagesCount ? 'cursor-pointer hover:shadow-xl' : 'cursor-no-drop'
        )}
        onClick={handleClick}
        disabled={images.length === imagesCount}
      >
        <Image
          alt="image-uploader"
          src={NO_IMAGE}
          fill={true}
          style={{
            objectFit: 'cover',
          }}
        />
      </button>
      <span className="error block">{errors.images?.message}</span>
    </div>
  );
};

export default ImagesModuleInput;
