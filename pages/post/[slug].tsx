import {options} from "assets/options";
import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import Item, {Price} from "components/Item/Item";
import MainLayout from "components/MainLayout/MainLayout";
import dayjs from 'dayjs'
import {getDictionary} from "functions/getDictionary";
import {googleTranslateText} from "functions/translateText";
import {PostInterface} from "interfaces";
import type {GetServerSideProps} from "next";
import {useTranslation} from 'next-i18next';
import Link from "next/link";
import {ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, {useEffect, useMemo, useState} from "react";
import classes from 'styles/classes.module.scss'
import item from "styles/Post.module.scss";
import {routes, tgLink} from "../../constants";

interface PostProps {
    post: PostInterface
    related: PostInterface[]
}

export default function Post({post: serverPost, related}: PostProps) {
    console.log('related', related)
    const {t, i18n} = useTranslation()
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

    const [header, setHeader] = useState<string>(title)
    const [subtitle, setSubtitle] = useState<string>(body)


    useEffect(() => {
        const translateTitle = async (): Promise<void> => {
            const translate = await googleTranslateText(title);
            if (translate) {
                setHeader(translate)
            }
        };

        const translateSubtitle = async (): Promise<void> => {
            const translate = await googleTranslateText(body);
            if (translate) {
                setSubtitle(translate)
            }
        };
        if (i18n.language === 'en') {
            translateTitle();
            translateSubtitle()
        }

    }, [i18n, body, title]);

    const category = useMemo(() => options.find(option => option.value === categoryId) || options[0], [categoryId])
    const seoTitle = useMemo(() => `${t(category.label)} ${title.slice(0, 50)} в городе Иннополис`, [category.label, title, t])
    const seoDescription = useMemo(() => body.slice(0, 320), [body])
    const seoImage = useMemo(() => preview, [preview])
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [category.label])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])
    const shareData = {
        title: 'InnoAds',
        text: 'Поделиться ссылкой:',
        url: process.env.NEXT_PUBLIC_NODE_ENV + '/post/' + slug
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
                                            title={header}
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
                <Link href={`${routes.main}/search?category=${categoryId}`} passHref>
                    <a>
                        <p>{t('category', {ns: 'post'})}: <span itemProp="category">{t(category.label)}</span></p>
                    </a></Link>
                <h1 itemProp='name'>{header}</h1>
                <p itemProp="price" className={item.price}><Price price={price}/></p>
                <hr/>
                <pre className={classes.paragraph} itemProp='description'>{subtitle}</pre>
                {/*<p itemProp='description' className={item.postBody}>{subtitle}</p>*/}
                <p className={classes.mt20}>{t('published', {ns: 'post'})}: {dayjs(createdAt).format("DD.MM.YYYY")}</p>
                <div className={classes.mt40}>
                    <Link href={tgLink + '/' + telegram}>
                        <a itemProp="seller">
                            <Button>
                                {t('textAuthor', {ns: 'post'})}
                            </Button>
                        </a>
                    </Link>
                </div>

                <div className={classes.mt40}>
                    <Link href={`/user/${post.tgId}`} passHref>
                        <Button>
                            {t('userAds', {ns: 'post'})}
                        </Button>
                    </Link>
                </div>

                <Button className={cn(classes.mt40, item.share)}
                        onClick={async () => await (navigator.share(shareData))}>{t('share', {ns: 'post'})}<span>&#8631;</span></Button>
                <div className={classes.mt40}>
                    <h2>Похожие объявления</h2>
                    <ul className={classes.related}>
                        {related.map((post: PostInterface) => {
                            return (
                                <Item post={post} key={post.slug}/>
                            );
                        })}
                    </ul>

                </div>

            </div>
        </MainLayout>

    );
}

export const getServerSideProps: GetServerSideProps = async ({locale, query}) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${query.slug}`)
    if (!response) {
        return {
            notFound: true,
        };
    }
    const snapshot = response.data;

    const related = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?category=${snapshot.categoryId}&size=4`)

    return {
        props: {post: snapshot, related: related.data.content, ...(await getDictionary(locale, ['post']))},
    };
}
