import Item from '@/components/Item'
import Layout from '@/components/Layout'
import Price from '@/components/Price'
import Button from '@/components/ui/Button'
import useOnScreen from '@/hooks/useOnScreen'
import {GetStaticPostPath} from '@/types'
import {PostDTO} from '@/types/PostDTO'
import fetchAd from "@/utils/api/fetchAd";
import fetchAds from "@/utils/api/fetchAds";
import {NO_IMAGE, tgLink} from '@/utils/constants'
import {categories} from '@/utils/options'
import {Routes} from '@/utils/routes'
import {clsx} from 'clsx'
import dayjs from 'dayjs'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import {GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, NextPage} from 'next/types'
import React, {useMemo, useRef} from 'react'

const Post: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({post, related}) => {
  const {t} = useTranslation()
  const ul = useRef<HTMLUListElement>(null)
  const refFirst = useRef<HTMLLIElement>(null)
  const refLast = useRef<HTMLLIElement>(null)
  const firstInView = useOnScreen(refFirst)
  const lastInVew = useOnScreen(refLast)

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

  const images = useMemo(() => post.images.split('||'), [post])
  const category = useMemo(
    () =>
      categories.find((option) => option.value === categoryId) || categories[0],
    [categoryId],
  )
  const seoTitle = useMemo(
    () => `${t(category.label)} ${title.slice(0, 50)} в городе Иннополис`,
    [category.label, title, t],
  )
  const seoDescription = useMemo(() => body.slice(0, 320), [body])
  const seoImage = useMemo(() => preview, [preview])
  const seoKeywords = useMemo(
    () => `innoads, Иннополис, доска объявлений, ${category.label}`,
    [category.label],
  )
  const canonical = useMemo(() => `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`, [slug])

  const shareData = {
    title: 'InnoAds',
    text: 'Поделиться ссылкой:',
    url: process.env.NEXT_PUBLIC_APP_URL + '/post/' + slug,
  }

  const handleClick = (direction: 'left' | 'right') => {
    const res = direction === 'right' ? 1 : -1
    if (ul.current && refFirst.current && refLast.current) {
      ul.current.scrollTo({left: ul.current.scrollLeft + 300 * res, behavior: 'smooth'})
    }
  }

  return (
    <Layout
      title={seoTitle}
      description={seoDescription}
      canonical={canonical}
      keywords={seoKeywords}
      image={seoImage}
      author={`${tgLink}/${user?.username}`}
    >
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
                  ref={index === 0 ? refFirst : index === images.length - 1 ? refLast : undefined}
                >
                  <Image
                    src={image}
                    alt='image'
                    title={title}
                    fill={true}
                    style={{objectFit: 'cover'}}
                    placeholder='blur'
                    blurDataURL={NO_IMAGE}
                  />
                </li>
              )
            })}
          </ul>
          <Button
            className={clsx('absolute top-1/2 w-fit -translate-y-1/2 p-2', 'left-0', (firstInView || images.length < 2) && 'hidden')}
            onClick={() => handleClick('left')}
          >
            &larr;
          </Button>
          <Button
            className={clsx('absolute top-1/2 w-fit -translate-y-1/2 p-2', 'right-0', (lastInVew || images.length < 2) && 'hidden')}
            onClick={() => handleClick('right')}
          >
            &rarr;
          </Button>
        </div>

        <Link href={`${Routes.main}search?categoryId=${categoryId}`}>
          {t('category')}:{' '}
          <span>{t(category.label)}</span>
        </Link>

        <h1>{title}</h1>
        <Price price={price}/>
        <hr/>
        <pre className='whitespace-pre-wrap break-words'>{body}</pre>
        <p className='mt-5'>
          {t('published')}:{' '}
          {dayjs(createdAt).format('DD.MM.YYYY')}
        </p>

        <Link href={tgLink + '/' + user?.username} passHref className='mt-8 block'>
          <Button>{t('textAuthor')}</Button>
        </Link>


        <Link href={`/user/${post.userId}`} passHref className='mt-8 block'>
          <Button>{t('userAds')}</Button>
        </Link>

        <Button
          className='mt-8'
          onClick={async () => await navigator.share(shareData)}
        >
          {t('share')}
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
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async ({locales = []}) => {
  const {content: posts} = await fetchAds({size: 1000})
  const paths: GetStaticPostPath[] = posts.flatMap(post =>
    locales.map(locale => ({
      params: {slug: post.slug},
      locale,
    })))
  return {
    paths,
    fallback: 'blocking',
  }
}


export const getStaticProps: GetStaticProps = async ({params, locale}) => {
  const ad = await fetchAd(params?.slug as string)

  if (!ad) {
    return {
      notFound: true,
    }
  }

  const related = await fetchAds({
    categoryId: ad.categoryId,
    size: 5,
  })

  if (!related) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: ad,
      related: related.content.filter(x => x.id !== ad.id),
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: 3600,
  }
}

