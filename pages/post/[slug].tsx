import {options} from "assets/options";
import axios from "axios";
import Button from "components/Button/Button";
import Header from "components/Header/Header";
import {PostInterface} from "interfaces";
import moment from "moment";
import type {GetServerSideProps} from "next";
import Head from "next/head";
import Link from "next/link";
import {ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, {useMemo, useState} from "react";
import item from "styles/Item.module.scss";

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
    const seoTitle = useMemo(() => `${category.label} ${title.slice(0, 50)} ${price.toString()}`, [category.label, price, title])
    const seoDescription = useMemo(() => body.slice(0, 320), [body])
    const seoImage = useMemo(() => preview, [preview])
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [category.label])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])

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
                <div className={item.item} itemScope itemType="https://schema.org/Offer">
                    <div className={item.carousel}>
                        <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={100}
                            totalSlides={images.length}
                            isPlaying={true}
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
                            <ButtonBack className={item.button} style={{left: 0}}>
                                &larr;
                            </ButtonBack>
                            <ButtonNext className={item.button} style={{right: 0}}>
                                &rarr;
                            </ButtonNext>
                        </CarouselProvider>
                    </div>
                    <p className={item.category}>Категория: <span itemProp="category">{category.label}</span></p>
                    <h1 itemProp='name'>{title}</h1>
                    <p itemProp="price" className={item.price}>{price} {!isNaN(price) && <span>&#8381;</span>}</p>
                    <hr/>
                    <p itemProp='description' className={item.description}>{body}</p>
                    <p>Опубликован: {moment(createdAt).format("DD.MM.YYYY")}</p>
                    <div className={item.mt40}>
                        <Link href={`https://t.me/${telegram}`}>
                            <a itemProp="seller">
                                <Button>
                                    Написать автору
                                </Button>
                            </a>
                        </Link>
                    </div>

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
