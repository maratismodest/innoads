import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import useOnScreen from '@/hooks/useOnScreen';
import { NO_IMAGE } from '@/utils/constants';

interface ImageInViewProps {
  src: string;
  setCurrent: (index: number) => void;
  index: number;
}

export function ImageInView({ src, setCurrent, index }: ImageInViewProps) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useOnScreen(ref);

  useEffect(() => {
    if (inView) {
      setCurrent(index);
    }
  }, [inView, index, setCurrent]);

  return (
    <Image
      ref={ref}
      draggable={false}
      src={index === 0 || inView ? src : NO_IMAGE}
      alt="image"
      // fill={true}
      width={400}
      height={400}
      style={{ objectFit: 'cover' }}
      placeholder="blur"
      blurDataURL={NO_IMAGE}
      priority={index === 0}
      className="h-full"
    />
  );
}
