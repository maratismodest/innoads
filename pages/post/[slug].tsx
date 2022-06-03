import axios from "axios";
import moment from "moment";
import type {GetServerSideProps} from "next";
import Head from "next/head";
import Link from "next/link";
import {ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, {useCallback, useMemo, useState} from "react";
import {options} from "../../assets/options";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import {useAuth} from "../../context/AuthContext";
import {PostInterface} from "../../interfaces";
import classes from "../../styles/Item.module.scss";

interface PostProps {
    post: PostInterface
}

export default function Post({post: serverPost}: PostProps) {
    const [post] = useState<PostInterface>(serverPost);
    const [images] = useState<string[]>(() => post.images.split("||"));
    const {user} = useAuth();

    const {
        title,
        body,
        preview,
        categoryId,
        price,
        createdAt,
        telegram,
        tgId,
        slug
    } = post;

    const category = useMemo(() => options.find(option => option.value === categoryId) || options[0], [])
    const seoTitle = useMemo(() => `${category.label} ${title.slice(0, 50)} ${price.toString()}`, [])
    const seoDescription = useMemo(() => body.slice(0, 320), [])
    const seoImage = useMemo(() => preview, [])
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [])

    const handleRefresh = useCallback(async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, {...post})
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post`, {...post, createdAt: new Date()})
            alert('Объявление поднято в поиске!')
            return
        } catch (e) {
            alert('Что-то пошло не так!')
            console.log(e)
        }
    }, [])

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
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NODE_ENV}/post/slug`}/>
                <meta property="og:image" content={seoImage}/>
                <meta name="author" content={`https://t.me/${telegram}`}/>
                <link rel="image_src" href={preview}/>
            </Head>
            <Header/>
            <main>
                <div className={classes.item} itemScope itemType="https://schema.org/Offer">
                    <div className={classes.carousel}>
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
                                                className={classes.image}
                                                title={title}
                                                itemProp='image'
                                            />
                                        </Slide>
                                    );
                                })}
                            </Slider>
                            <ButtonBack className={classes.button} style={{left: 0}}>
                                &larr;
                            </ButtonBack>
                            <ButtonNext className={classes.button} style={{right: 0}}>
                                &rarr;
                            </ButtonNext>
                        </CarouselProvider>
                    </div>
                    <p className={classes.category}>Категория: <span itemProp="category">{category.label}</span></p>
                    <h1 itemProp='name'>
                        {title}
                    </h1>
                    <p itemProp="price" className={classes.price}>{price} {isNaN(price) ? null : "р"}</p>
                    {/*<Button onClick={handleRefresh}>Поднять объявление</Button>*/}
                    <hr/>
                    <p itemProp='description' className={classes.description}>{body}</p>
                    <p>Опубликован: {moment(createdAt).format("DD.MM.YYYY")}</p>
                    {user && (user.id === tgId) &&
                        <div className={classes.mt40}>
                            <Button onClick={handleRefresh}>Поднять объявление</Button>
                        </div>
                    }
                    <div className={classes.mt40}>
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
