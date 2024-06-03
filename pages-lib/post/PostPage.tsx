'use client';
import ImageInView from '@/components/ImageInView';
import useLockedBody from '@/hooks/useLockedBody';
import { NO_IMAGE } from '@/utils/constants';
import { Dialog, DialogPanel } from '@headlessui/react';
import type { Post } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import LeftRightButtons from './LeftRightButtons';
import { postButtonStyles } from './utils';

type Props = {
  post: Post;
};

export default function PostPage<NextPage>({ post }: Props) {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useLockedBody(false, 'root');

  const ul = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);

  const images = useMemo(() => post.images.split('||'), [post]);

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

  useEffect(() => {
    if (open) {
      setLocked(true);
    } else {
      setLocked(false);
    }
    return () => setLocked(false);
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <DialogPanel className="relative flex h-full w-full max-w-2xl items-center justify-center bg-black md:bg-white">
            <Image
              src={images[current]}
              alt=""
              // fill
              style={{ objectFit: 'contain' }}
              // sizes="(max-width: 640px) 400px, (max-width: 768px) 600px, 800px"
              // sizes="400px"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={NO_IMAGE}
              className="w-full"
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
          {images.map((image: string, index: number) => (
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
        <button
          onClick={() => setOpen(true)}
          className={clsx(postButtonStyles, 'absolute left-1/2 top-0 -translate-x-1/2')}
        >
          &#x1F50D;
        </button>
        <div
          className={clsx(
            'bold rounded bg-[rgba(0,0,0,0.6)] p-1 text-sm text-white',
            'absolute bottom-0 left-1/2 -translate-x-1/2'
          )}
        >{`${current + 1} / ${images.length}`}</div>
      </div>
    </>
  );
}
