'use client';
import ImageInView from '@/components/ImageInView';
import useLockedBody from '@/hooks/useLockedBody';
import type { PostDTO } from '@/types';
import { NO_IMAGE } from '@/utils/constants';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  post: PostDTO;
};

const styles =
  'bg-[rgba(0,0,0,0.6)] text-white rounded-full w-12 h-12 flex justify-center items-center';

export default function PostPage<NextPage>({ post }: Props) {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useLockedBody(false, 'root');

  const ul = useRef<HTMLUListElement>(null);

  const { title, body, categoryId, price, createdAt, user, slug } = post;

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
      {
        <dialog
          open={open}
          className="fixed top-[64px] z-40 h-[calc(100vh_-_64px)] w-screen max-w-full bg-black backdrop-grayscale"
        >
          <button
            className={clsx(styles, 'absolute right-4 top-4 z-50')}
            onClick={() => setOpen(false)}
          >
            &#x2715;
          </button>
          <Image
            draggable={false}
            src={images[current]}
            alt="image"
            title={title}
            fill={true}
            style={{ objectFit: 'contain' }}
            placeholder="blur"
            blurDataURL={NO_IMAGE}
          />
        </dialog>
      }
      <div className="relative">
        <ul
          className="relative flex aspect-square snap-x snap-mandatory flex-nowrap gap-2 overflow-x-scroll"
          ref={ul}
        >
          {images.map((image: string, index: number) => {
            return (
              <li
                key={image}
                className="relative flex aspect-square h-full flex-none snap-center overflow-y-hidden"
                ref={(el: HTMLLIElement) => (refs.current[index] = el)}
              >
                <ImageInView index={index} src={image} setCurrent={setCurrent} />
              </li>
            );
          })}
        </ul>
        <button
          className={clsx(
            styles,
            'absolute top-1/2 hidden -translate-y-1/2',
            'left-0',
            current !== 0 && images.length > 1 && '!block'
          )}
          onClick={() => handleClick('left')}
          hidden={current === 0 || images.length < 2}
        >
          &larr;
        </button>
        <button
          className={clsx(
            styles,
            'absolute top-1/2 hidden -translate-y-1/2',
            'right-0',
            current + 1 < images.length && images.length > 1 && '!block'
          )}
          onClick={() => handleClick('right')}
        >
          &rarr;
        </button>
        <button
          onClick={() => setOpen(true)}
          className={clsx(styles, 'absolute left-1/2 top-0 -translate-x-1/2')}
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
