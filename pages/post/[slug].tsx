import axios from "axios";
import _ from "lodash";
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
    slug?: string
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

    const category = _.find(options, {value: categoryId}) || options[0]
    const seoTitle = useMemo(() => `${category.label} ${title.slice(0, 50)} ${price.toString()}`, [post])
    const seoDescription = body.slice(0, 320)
    const seoImage = preview
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [category])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])

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
    }, [post])

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
                <meta property="og:url" content={process.env.NEXT_PUBLIC_NODE_ENV}/>
                <meta property="og:image" content={seoImage}/>
                <meta name="author" content={`https://t.me/${telegram}`}/>
                <link rel="image_src" href={preview}/>
            </Head>
            <Header/>
            <main>
                <div className={classes.item}>
                    <div style={{position: "relative"}}>
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

                    <h1>
                        {title} - {price}
                        {isNaN(price) ? null : "р"}
                    </h1>
                    {/*<Button onClick={handleRefresh}>Поднять объявление</Button>*/}
                    <hr/>
                    <p style={{whiteSpace: 'pre-wrap'}}>{body}</p>
                    <p>Опубликован: {moment(createdAt).format("DD.MM.YYYY")}</p>
                    {user && (user.id === tgId) &&
                        <div style={{marginTop: 40}}>
                            <Button onClick={handleRefresh}>Поднять объявление</Button>
                        </div>
                    }
                    <div style={{marginTop: 40}} itemScope itemType="https://schema.org/Person">
                        <Link href={`https://t.me/${telegram}`}>
                            <a itemProp="url">
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
        props: {post: snapshot, slug: snapshot.slug},
    };
}
