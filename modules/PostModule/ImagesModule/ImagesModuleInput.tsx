import { ACCEPTED_IMAGE_FORMAT } from '@/modules/PostModule/utils';
import { NO_IMAGE } from '@/utils/constants';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef } from 'react';
import { Methods } from './utils';

interface AddImageInputProps {
  images: string[];
  imageHandler: (files: FileList | null) => void;
  methods: Methods;
}
const ImagesModuleInput = ({ images, imageHandler, methods }: AddImageInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { register, formState, setValue } = methods;
  const { errors } = formState;
  return (
    <div>
      <label>Добавить фото (по одному, но не более 4)</label>
      <div
        className={clsx(
          'relative mb-2 aspect-square w-[48%] hover:shadow lg:mr-2',
          images && images.length < 4 ? 'cursor-pointer hover:shadow-xl' : 'cursor-no-drop'
        )}
        onClick={() => {
          if (images.length < 4) {
            ref.current && ref.current.click();
          } else {
            alert('Не более 4 фото!');
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
      <input
        type="file"
        {...register('images')}
        name="images"
        onChange={async event => await imageHandler(event.target.files)}
        hidden
        ref={ref}
        multiple={false}
        accept={ACCEPTED_IMAGE_FORMAT}
      />
      <span className="text-red">{errors.images?.message}</span>
    </div>
  );
};

export default ImagesModuleInput;
