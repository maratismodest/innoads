import Image from 'next/image'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useMemo, useRef } from 'react'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import useOnScreen from 'hooks/useOnScreen'
import { GetStaticPostPath, PostInterface } from 'types'
import fetchPost from 'utils/api/fetchPost'
import fetchPosts from 'utils/api/fetchPosts'
import { NO_IMAGE, tgLink } from 'utils/constants'
import { categories } from 'utils/options'
import { Routes } from 'utils/routes'

import Button from 'components/Button'
import Item from 'components/Item'
import Layout from 'components/Layout'
import Price from 'components/Price'

const Post: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({ post, related }) => {
    const { t } = useTranslation()
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
            ul.current.scrollLeft = ul.current.scrollLeft + 300 * res
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
                                        style={{ objectFit: 'cover' }}
                                        placeholder='blur'
                                        blurDataURL={NO_IMAGE}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <Button
                        className={clsx('absolute top-1/2 w-fit -translate-y-1/2 p-2', 'left-0')}
                        onClick={() => handleClick('left')}
                        hidden={firstInView || images.length < 2}
                    >
                        &larr;
                    </Button>
                    <Button
                        className={clsx('absolute top-1/2 w-fit -translate-y-1/2 p-2', 'right-0')}
                        onClick={() => handleClick('right')}
                        hidden={lastInVew || images.length < 2}
                    >
                        &rarr;
                    </Button>
                </div>

                <Link href={`${Routes.main}search?categoryId=${categoryId}`}>
                    {t('category', { ns: 'post' })}:{' '}
                    <span>{t(category.label)}</span>
                </Link>

                <h1>{title}</h1>
                <Price price={price} />
                <hr />
                <pre className='whitespace-pre-wrap break-words'>{body}</pre>
                <p className='mt-5'>
                    {t('published', { ns: 'post' })}:{' '}
                    {dayjs(createdAt).format('DD.MM.YYYY')}
                </p>

                <Link href={tgLink + '/' + user?.username} passHref className='mt-8 block'>
                    <Button>{t('textAuthor', { ns: 'post' })}</Button>
                </Link>


                <Link href={`/user/${post.userId}`} passHref className='mt-8 block'>
                    <Button>{t('userAds', { ns: 'post' })}</Button>
                </Link>

                <Button
                    className='mt-8'
                    onClick={async () => await navigator.share(shareData)}
                >
                    {t('share', { ns: 'post' })}
                </Button>
                {related.length > 0 && (
                    <div className='mt-10'>
                        <h2>Похожие объявления</h2>
                        <ul className='grid grid-cols-2 gap-4'>
                            {related.map((post: PostInterface) => {
                                return <Item post={post} key={post.slug} />
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Post

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    const { content: posts } = await fetchPosts({ size: 1000 })
    const paths: GetStaticPostPath[] = posts.flatMap(post =>
        locales.map(locale => ({
            params: { slug: post.slug },
            locale,
        })))
    return {
        paths,
        fallback: 'blocking',
    }
}


export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const post = await fetchPost(params?.slug as string)

    if (!post) {
        return {
            notFound: true,
        }
    }

    const related = await fetchPosts({
        categoryId: post.categoryId,
        size: 5,
    })

    if (!related) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post,
            related: related.content.filter(x => x.id !== post.id),
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
        revalidate: 3600,
    }
}

