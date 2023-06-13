import useOnScreen from '@/hooks/useOnScreen';
import { NO_IMAGE } from '@/utils/constants';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface ImageInViewProps {
  title: string,
  src: string,
  setCurrent: Dispatch<SetStateAction<number>>
  index: number
}

export default function ImageInView({ title, src, setCurrent, index }: ImageInViewProps) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useOnScreen(ref);

  useEffect(() => {
    if (inView) {
      setCurrent(index);
    }
  }, [inView]);
  return (
    <Image
      ref={ref}
      draggable={false}
      src={src}
      alt='image'
      title={title}
      fill={true}
      style={{ objectFit: 'cover' }}
      placeholder='blur'
      blurDataURL={NO_IMAGE}
    />
  );
};
