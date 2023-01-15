import Image from 'next/image'
import Link from 'next/link'
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React, {useMemo, useRef, useState} from 'react'
import {isMobile} from 'react-device-detect'
import cn from 'classnames'
import dayjs from 'dayjs'
import {PostInterface} from 'interfaces'
import fetchPost from 'utils/api/fetchPost'
import fetchPosts from 'utils/api/fetchPosts'
import {tgLink} from 'utils/constants'
import {options} from 'utils/options'
import {Routes} from 'utils/routes'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'
import Price from 'components/Price/Price'

import classes from 'styles/classes.module.scss'
import item from 'styles/Post.module.scss'

const Post: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({post, related}) => {
    const {t} = useTranslation()
    const [current, setCurrent] = useState(0)
    const ul = useRef<HTMLUListElement>(null)
    const li = useRef<HTMLLIElement>(null)

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
            options.find((option) => option.value === categoryId) || options[0],
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
        if (ul.current && li.current) {
            ul.current.scrollLeft = ul.current.scrollLeft + 300 * res
            setCurrent((prevState) => prevState + res)
        }
    }

    return (
        <MainLayout
            title={seoTitle}
            description={seoDescription}
            canonical={canonical}
            keywords={seoKeywords}
            image={seoImage}
            author={`${tgLink}/${user?.username}`}
        >
            <div className={item.post}>
                <div style={{position: 'relative'}}>
                    <ul className={item.carousel} ref={ul}>
                        {images.map((image: string, index: number) => {
                            return (
                                <li
                                    key={image}
                                    className={item.image}
                                    ref={index === 0 ? li : undefined}
                                >
                                    <Image
                                        src={image}
                                        alt='image'
                                        title={title}
                                        width={300}
                                        height={300}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <button
                        className={cn(item.button, item.buttonLeft)}
                        disabled={isMobile ? false : current < 1}
                        onClick={() => handleClick('left')}
                    >
                        &larr;
                    </button>
                    <button
                        className={cn(item.button, item.buttonRight)}
                        disabled={
                            isMobile ? false : current + 1 >= images.length
                        }
                        onClick={() => handleClick('right')}
                    >
                        &rarr;
                    </button>
                </div>

                <Link href={`${Routes.main}search?categoryId=${categoryId}`}>
                    {t('category', {ns: 'post'})}:{' '}
                    <span>{t(category.label)}</span>
                </Link>

                <h1>{title}</h1>
                <Price price={price}/>
                <hr/>
                <pre className={classes.paragraph}>{body}</pre>
                <p className={classes.mt20}>
                    {t('published', {ns: 'post'})}:{' '}
                    {dayjs(createdAt).format('DD.MM.YYYY')}
                </p>
                <div className={classes.mt40}>
                    <Link href={tgLink + '/' + user?.username} passHref={true}>
                        <Button>{t('textAuthor', {ns: 'post'})}</Button>
                    </Link>
                </div>

                <div className={classes.mt40}>
                    <Link href={`/user/${post.userId}`} passHref>
                        <Button>{t('userAds', {ns: 'post'})}</Button>
                    </Link>
                </div>

                {isMobile && (
                    <Button
                        className={cn(classes.mt40, item.share)}
                        onClick={async () => await navigator.share(shareData)}
                    >
                        {t('share', {ns: 'post'})}
                    </Button>
                )}
                {related.length > 0 && (
                    <div className={classes.mt40}>
                        <h2>Похожие объявления</h2>
                        <ul className={classes.related}>
                            {related.map((post: PostInterface) => {
                                return <Item post={post} key={post.slug}/>
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default Post
export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const post = await fetchPost(query.slug as string)

    if (!post) {
        return {
            notFound: true,
        }
    }

    const response = await fetchPosts(post.categoryId, 0, 5)

    if (!response) {
        return {
            notFound: true,
        }
    }


    return {
        props: {
            post,
            isMobile,
            related: response.content.filter(x => x.id !== post.id),
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}
