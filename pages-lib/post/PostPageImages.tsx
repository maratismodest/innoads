'use client';
import ImageInView from '@/components/ImageInView';
import { NO_IMAGE } from '@/utils/constants';
import { Dialog, DialogPanel } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import LeftRightButtons from './LeftRightButtons';
import { postButtonStyles } from './utils';

type Props = {
  images: string[];
};

export default function PostPageImages<NextPage>({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const ul = useRef<HTMLUListElement>(null);
  const refs = useRef<HTMLLIElement[]>([]);

  const handleClick = (direction: 'left' | 'right') => {
    const res = direction === 'right' ? 1 : -1;
    setCurrent(prevState => prevState + res);
    if (ul.current) {
      ul.current.scrollTo({
        left: ul.current.scrollLeft + ul.current.clientWidth * res,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <DialogPanel className="relative flex h-full w-full max-w-2xl items-center justify-center bg-black md:bg-white">
            <Image
              src={images[current]}
              alt=""
              style={{ objectFit: 'contain' }}
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={NO_IMAGE}
              className="w-full"
              draggable="false"
            />
            <button
              className={clsx(postButtonStyles, 'absolute right-4 top-4 z-50')}
              onClick={() => setOpen(false)}
            >
              &#x2715;
            </button>
            <LeftRightButtons
              key="fullscreen"
              current={current}
              images={images}
              handleClick={handleClick}
            />
          </DialogPanel>
        </div>
      </Dialog>
      <div className="relative">
        <ul
          className="relative flex aspect-square snap-x snap-mandatory flex-nowrap gap-2 overflow-x-scroll"
          ref={ul}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="relative flex aspect-square h-full flex-none snap-center overflow-y-hidden"
              // @ts-ignore
              ref={(el: HTMLLIElement) => (refs.current[index] = el)}
            >
              <ImageInView index={index} src={image} setCurrent={setCurrent} />
            </li>
          ))}
        </ul>
        <LeftRightButtons
          key="preview"
          current={current}
          images={images}
          handleClick={handleClick}
        />
        {/*FullScreen*/}
        <button
          onClick={() => setOpen(true)}
          className={clsx(postButtonStyles, 'absolute left-1/2 top-0 -translate-x-1/2')}
        >
          &#x1F50D;
        </button>
        <div
          className={clsx('count', 'absolute bottom-0 left-1/2 -translate-x-1/2')}
        >{`${current + 1} / ${images.length}`}</div>
      </div>
    </>
  );
}
