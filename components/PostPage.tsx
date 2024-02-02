'use client';
import ImageInView from '@/components/ImageInView';
import Item from '@/components/Item';
import Price from '@/components/Price';
import Button from '@/components/ui/Button';
import useLockedBody from '@/hooks/useLockedBody';
import buttonStyles from '@/styles/buttonStyles';
import type { PostDTO } from '@/types';
import { Option } from '@/types/global';
// import { categories } from '@/utils/categories';
import { NO_IMAGE, routes, tgLink } from '@/utils/constants';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  post: PostDTO;
  related: PostDTO[];
  categories: Option[];
};

const styles =
  'bg-[rgba(0,0,0,0.6)] text-white rounded-full w-12 h-12 flex justify-center items-center';

export default function PostPage<NextPage>({ post, related, categories }: Props) {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useLockedBody(false, 'root');

  const ul = useRef<HTMLUListElement>(null);

  const { title, body, categoryId, price, createdAt, user, slug } = post;

  const [open, setOpen] = useState(false);

  const images = useMemo(() => post.images.split('||'), [post]);

  const refs = useRef<HTMLLIElement[]>([]);

  const category = useMemo(
    () => categories.find(option => option.value === categoryId) || categories[0],
    [categoryId, categories],
  );

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
          className='fixed top-[64px] z-40 h-[calc(100vh_-_64px)] w-screen max-w-full bg-black backdrop-grayscale'
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
            alt='image'
            title={title}
            fill={true}
            style={{ objectFit: 'contain' }}
            placeholder='blur'
            blurDataURL={NO_IMAGE}
            priority={current === 0}
          />
        </dialog>
      }
      <div className='relative mx-auto w-full max-w-[400px]'>
        <div className='relative'>
          <ul
            className='relative flex aspect-square snap-x snap-mandatory flex-nowrap gap-2 overflow-x-scroll'
            ref={ul}
          >
            {images.map((image: string, index: number) => {
              return (
                <li
                  key={image}
                  className='relative aspect-square h-full flex-none snap-center overflow-y-hidden'
                  ref={(el: HTMLLIElement) => (refs.current[index] = el)}
                >
                  <ImageInView index={index} src={image} title={title} setCurrent={setCurrent} />
                </li>
              );
            })}
          </ul>
          <button
            className={clsx(
              styles,
              'absolute top-1/2 hidden -translate-y-1/2',
              'left-0',
              current !== 0 && images.length > 1 && '!block',
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
              current + 1 < images.length && images.length > 1 && '!block',
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
              'absolute bottom-0 left-1/2 -translate-x-1/2',
            )}
          >{`${current + 1} / ${images.length}`}</div>
        </div>

        <Link href={`${routes.main}search?categoryId=${categoryId}`}>
          Категория: {category.label}
        </Link>

        <h1>{title}</h1>
        <Price price={price} />
        <hr />
        <p className='break-words'>{body}</p>
        <time className='mt-5'>Опубликовано: {dayjs(createdAt).format('DD.MM.YYYY')}</time>

        <a href={tgLink + '/' + user.username} target='_blank' className={clsx(buttonStyles(), 'mt-8 !block')}>
          Написать автору
        </a>

        <Link href={`/user/${post.userId}`} passHref className='mt-8 block'>
          <Button>Все объявления автора</Button>
        </Link>

        <Button
          className='mt-8'
          onClick={async () =>
            await navigator.share({
              title: process.env.NEXT_PUBLIC_APP_NAME,
              text: 'Поделиться ссылкой:',
              url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
            })
          }
        >
          Поделиться
        </Button>
        {related.length > 0 && (
          <div className='mt-10'>
            <h2>Похожие объявления</h2>
            <ul className='grid grid-cols-2 gap-4'>
              {related.map((post: PostDTO) => (
                <li key={post.slug}>
                  <Item post={post} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

// useEffect(() => {
//   if (open) {
//     document.body.style.overflow = 'hidden';
//   } else {
//     document.body.style.overflow = 'unset';
//   }
// }, [open]);
