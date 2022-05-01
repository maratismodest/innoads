import React, {useState} from "react";
import type {GetServerSideProps} from "next";
import Link from "next/link";
import {ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import moment from "moment";
import axios from "axios";
import _ from "lodash";
import classes from "../../styles/Item.module.scss";
import {PostInterface} from "../../interfaces";
import Button from "../../components/Button/Button";
import {options} from "../../assets/options";
import Head from "next/head";
import Header from "../../components/Header/Header";


interface PostProps {
    post: PostInterface
    slug?: string
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
    } = post;

    const category = _.find(options, {value: categoryId}) || options[0]
    const seoTitle = `InnoAds ${category.label} ${title} ${price.toString()}`
    const seoDescription = body
    const seoImage = preview
    return (
        <>
            <Head>
                <title>
                    {seoTitle}
                </title>
                <meta name="description" content={seoDescription}/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="keywords" content="innoads Иннополис"/>
                <meta name="robots"/>
                <meta name="image" content={seoImage}/>
                <meta name="language" content="ru"/>
                <meta charSet="utf-8"/>
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
                    <hr/>
                    <p style={{whiteSpace: 'pre-wrap'}}>{body}</p>
                    <p>Опубликован: {moment(createdAt).format("DD.MM.YYYY")}</p>

                    <div style={{marginTop: 40}}>
                        <Link href={`https://t.me/${telegram}`}>
                            <a>
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
    const data = snapshot
    return {
        props: {post: data, slug: snapshot.slug},
    };
}
