'use client'
import ImageInView from "@/components/ImageInView";
import Item from "@/components/Item";
import Price from "@/components/Price";
import Button from "@/components/ui/Button";
import {PostDTO} from "@/types";
import {categories} from "@/utils/categories";
import {NO_IMAGE, routes, tgLink} from "@/utils/constants";
import {clsx} from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  post: PostDTO,
  related: PostDTO[]
}

const styles = 'bg-[rgba(0,0,0,0.6)] text-white rounded-full w-12 h-12 flex justify-center items-center'

const Post = ({post, related}: Props) => {
  const [current, setCurrent] = useState(0)

  const ul = useRef<HTMLUListElement>(null)

  const {
    title,
    body,
    preview,
    categoryId,
    price,
    createdAt,
    user,
    slug,
  } = post

  const [open, setOpen] = useState(false)

  const images = useMemo(() => post.images.split('||'), [post])

  const refs = useRef<HTMLLIElement[]>([])

  const category = useMemo(
    () =>
      categories.find((option) => option.value === categoryId) || categories[0],
    [categoryId],
  )

  const handleClick = (direction: 'left' | 'right') => {
    const res = direction === 'right' ? 1 : -1
    setCurrent(prevState => prevState + res)
    if (ul.current) {
      ul.current.scrollTo({left: ul.current.scrollLeft + ul.current.clientWidth * res, behavior: 'smooth'})
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    // <Layout
    //   title={`${t(category.label)} ${title.slice(0, 50)} в городе Иннополис`}
    //   description={body.slice(0, 320)}
    //   canonical={`${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`}
    //   keywords={`innoads, Иннополис, доска объявлений, ${t(category.label)}`}
    //   image={preview}
    //   author={`${tgLink}/${user?.username}`}
    // >
    <>
      {<dialog open={open}
               className='z-40 w-screen h-[calc(100vh_-_64px)] backdrop-grayscale absolute max-w-full bg-black top-0'>
        <button className={clsx(styles, 'absolute right-4 top-4 z-50')} onClick={() => setOpen(false)}>
          &#x2715;
        </button>
        <Image
          draggable={false}
          src={images[current]}
          alt='image'
          title={title}
          fill={true}
          style={{objectFit: 'contain'}}
          placeholder='blur'
          blurDataURL={NO_IMAGE}
        />
      </dialog>
      }
      <div className='mx-auto max-w-[400px]'>
        <div className='relative'>
          <ul className='relative flex aspect-square snap-x snap-mandatory flex-nowrap gap-2 overflow-x-scroll'
              ref={ul}
          >
            {images.map((image: string, index: number) => {
              return (
                <li
                  key={image}
                  className='relative aspect-square h-full flex-none snap-center overflow-y-hidden'
                  ref={(el: HTMLLIElement) => refs.current[index] = el}
                >
                  <ImageInView
                    index={index}
                    src={image}
                    title={title}
                    setCurrent={setCurrent}
                  />
                </li>
              )
            })}
          </ul>
          <button
            className={clsx(styles, 'absolute top-1/2 -translate-y-1/2 hidden', 'left-0', ((current !== 0) && (images.length > 1)) && '!block')}
            onClick={() => handleClick('left')}
            hidden={(current === 0) || (images.length < 2)}
          >
            &larr;
          </button>
          <button
            className={clsx(styles, 'absolute -translate-y-1/2 top-1/2 hidden', 'right-0', ((current + 1 < images.length) && (images.length > 1)) && '!block')}
            onClick={() => handleClick('right')}
          >
            &rarr;
          </button>
          <button onClick={() => setOpen(true)}
                  className={clsx(styles, 'absolute top-0 left-1/2 -translate-x-1/2')}>&#x1F50D;
          </button>
          <div
            className={clsx('bg-[rgba(0,0,0,0.6)] text-white rounded text-sm bold p-1', 'absolute bottom-0 left-1/2 -translate-x-1/2')}>{`${current + 1} / ${images.length}`}</div>
        </div>

        <Link href={`${routes.main}search?categoryId=${categoryId}`}>
          Категория :{' '}
          <span>{category.label}</span>
        </Link>

        <h1>{title}</h1>
        <Price price={price}/>
        <hr/>
        <pre className='whitespace-pre-wrap break-words'>{body}</pre>
        <p className='mt-5'>
          Опубликован:{' '}
          {dayjs(createdAt).format('DD.MM.YYYY')}
        </p>

        <Link href={tgLink + '/' + user?.username} passHref className='mt-8 block'>
          <Button>Написать автору</Button>
        </Link>


        <Link href={`/user/${post.userId}`} passHref className='mt-8 block'>
          <Button>Объявления автора</Button>
        </Link>

        <Button
          className='mt-8'
          onClick={async () => await navigator.share({
            title: 'InnoAds',
            text: 'Поделиться ссылкой:',
            url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
          })}
        >
          Поделиться
        </Button>
        {related.length > 0 && (
          <div className='mt-10'>
            <h2>Похожие объявления</h2>
            <ul className='grid grid-cols-2 gap-4'>
              {related.map((post: PostDTO) => {
                return <Item post={post} key={post.slug}/>
              })}
            </ul>
          </div>
        )}
      </div>
    {/*</Layout>*/}
    </>
  )
};

export default Post;
