import {Routes, tgLink} from '../../constants'
import {options} from 'assets/options'
import axios from 'axios'
import cn from 'classnames'
import Button from 'components/Button/Button'
import Item, {Price} from 'components/Item/Item'
import MainLayout from 'components/MainLayout/MainLayout'
import dayjs from 'dayjs'
import {getUrl} from 'functions/getUrl'
import {PostInterface} from 'interfaces'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import {GetServerSideProps} from 'next/types'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import item from 'styles/Post.module.scss'
import classes from 'styles/classes.module.scss'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

interface PostProps {
    post: PostInterface
    related: PostInterface[]
    isMobile: boolean
}

export default function Post({post, related, isMobile}: PostProps) {

    console.log('post', post)
    // console.log('related', related)
    // console.log('isMobile', isMobile)

    const {t} = useTranslation()
    const [current, setCurrent] = useState(0)
    const [mounted, setMounted] = useState(false)
    const ul = useRef<HTMLUListElement>(null)
    const li = useRef<HTMLLIElement>(null)

    const {
        title,
        body,
        preview,
        categoryId,
        price,
        createdAt,
        telegram,
        slug,
    } = post

    const images = useMemo(() => post.images.split('||'), [post])
    const category = useMemo(
        () =>
            options.find((option) => option.value === categoryId) || options[0],
        [categoryId]
    )
    const seoTitle = useMemo(
        () => `${t(category.label)} ${title.slice(0, 50)} в городе Иннополис`,
        [category.label, title, t]
    )
    const seoDescription = useMemo(() => body.slice(0, 320), [body])
    const seoImage = useMemo(() => preview, [preview])
    const seoKeywords = useMemo(
        () => `innoads, Иннополис, доска объявлений, ${category.label}`,
        [category.label]
    )
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    const shareData = {
        title: 'InnoAds',
        text: 'Поделиться ссылкой:',
        url: process.env.NEXT_PUBLIC_NODE_ENV + '/post/' + slug,
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
            author={`https://t.me/${telegram}`}
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
                                        alt="image"
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

                <Link
                    href={`${Routes.main}search?category=${categoryId}`}
                    passHref
                >
                    <p>
                        {t('category', {ns: 'post'})}:{' '}
                        <span>{t(category.label)}</span>
                    </p>
                </Link>
                <h1>{title}</h1>
                <p className={item.price}>
                    <Price price={price}/>
                </p>
                <hr/>
                <pre className={classes.paragraph}>{body}</pre>
                <p className={classes.mt20}>
                    {t('published', {ns: 'post'})}:{' '}
                    {dayjs(createdAt).format('DD.MM.YYYY')}
                </p>
                <div className={classes.mt40}>
                    <Link href={tgLink + '/' + telegram} passHref={true}>
                        <Button>{t('textAuthor', {ns: 'post'})}</Button>
                    </Link>
                </div>

                <div className={classes.mt40}>
                    <Link href={`/user/${post.tgId}`} passHref>
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

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                                 req,
                                                             }) => {

    const UA = req.headers['user-agent']
    const isMobile = Boolean(
        UA?.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    )
    const {data: post} = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${query.slug}`
    )

    if (!post) {
        return {
            notFound: true,
        }
    }

    const related = await axios.get(
        getUrl(
            post.categoryId,
            0,
            5,
            encodeURIComponent(post.title.split(' ')[0])
        )
    )

    return {
        props: {
            post,
            isMobile,
            related: related.data.content.filter(
                (x: PostInterface) => x.id !== post.id
            ),
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}
