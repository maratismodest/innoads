import {options} from "assets/options";
import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import Header from "components/Header/Header";
import {Price} from "components/Item/Item";
import {PostInterface} from "interfaces";
import moment from "moment";
import type {GetServerSideProps} from "next";
import Head from "next/head";
import Link from "next/link";
import {ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, {useMemo, useState} from "react";
import classes from 'styles/classes.module.scss'
import item from "styles/Post.module.scss";
import {tgLink} from "../../constants";

interface PostProps {
    post: PostInterface
}

export default function Post({post: serverPost}: PostProps) {
    const [post] = useState<PostInterface>(serverPost);
    const [images] = useState<string[]>(() => post.images.split("||"));

    const {
        title,
        body,
        preview,
        categoryId,
        price,
        createdAt,
        telegram,
        slug
    } = post;

    const category = useMemo(() => options.find(option => option.value === categoryId) || options[0], [categoryId])
    const seoTitle = useMemo(() => `${category.label} ${title.slice(0, 50)} ${price.toString()} в городе Иннополис`, [category.label, price, title])
    const seoDescription = useMemo(() => body.slice(0, 320), [body])
    const seoImage = useMemo(() => preview, [preview])
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [category.label])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])
    const shareData = {
        title: 'InnoAds',
        text: 'Поделиться ссылкой',
        url: process.env.NEXT_PUBLIC_NODE_ENV + '/post/' + slug
    }

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <link rel="canonical" href={canonical}/>
                <meta name="description" content={seoDescription}/>
                <meta name="keywords" content={seoKeywords}/>
                <meta name="image" content={seoImage}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={seoDescription}/>
                <meta property="og:url" content={canonical}/>
                <meta property="og:image" content={seoImage}/>
                <meta name="author" content={`https://t.me/${telegram}`}/>
                <link rel="image_src" href={preview}/>
            </Head>
            <Header/>
            <main>
                <div className={item.post} itemScope itemType="https://schema.org/Offer">
                    <div className={item.carousel}>
                        <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={100}
                            totalSlides={images.length}
                        >
                            <Slider>
                                {images.map((image: string, index: number) => {
                                    return (
                                        <Slide index={index} key={image}>
                                            <Image
                                                hasMasterSpinner={true}
                                                src={image}
                                                alt="image"
                                                className={item.image}
                                                title={title}
                                                itemProp='image'
                                            />
                                        </Slide>
                                    );
                                })}
                            </Slider>
                            <ButtonBack className={cn(item.button, item.buttonLeft)}>
                                &larr;
                            </ButtonBack>
                            <ButtonNext className={cn(item.button, item.buttonRight)}>
                                &rarr;
                            </ButtonNext>
                        </CarouselProvider>
                    </div>
                    <p>Категория: <span itemProp="category">{category.label}</span></p>
                    <h1 itemProp='name'>{title}</h1>
                    <p itemProp="price" className={item.price}><Price price={price}/></p>
                    <hr/>
                    <p itemProp='description'>{body}</p>
                    <p className={classes.mt20}>Опубликован: {moment(createdAt).format("DD.MM.YYYY")}</p>
                    <div className={classes.mt40}>
                        <Link href={tgLink + '/' + telegram}>
                            <a itemProp="seller">
                                <Button>
                                    Написать автору
                                </Button>
                            </a>
                        </Link>
                    </div>

                    <div className={classes.mt40}>
                        <Link href={`/user/${post.tgId}`} passHref>
                            <Button>
                                Все объявления автора
                            </Button>
                        </Link>
                    </div>

                    <Button className={cn(classes.mt40, item.share)}
                            onClick={async () => await (navigator.share(shareData))}>Поделиться<span>&#8631;</span></Button>

                </div>
            </main>
        </>

    );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${context.query.slug}`)
    if (!query) {
        return {
            notFound: true,
        };
    }
    const snapshot = query.data;
    return {
        props: {post: snapshot},
    };
}
