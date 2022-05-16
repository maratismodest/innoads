import React, {useState} from 'react';
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link';
// import dynamic from 'next/dynamic'
import axios from "axios";
import {orderBy} from "lodash";
import InfiniteScroll from 'react-infinite-scroller';
import classes from './../styles/Home.module.scss'
import Item from '../components/Item/Item';
import Search from '../components/Search/Search';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import {PostInterface} from '../interfaces';
import Spinner from '../components/Spinner/Spinner';
import dynamic from "next/dynamic";
const Premium = dynamic(() => import('../components/Premium/Premium'), {ssr: false})

interface HomeProps {
    posts: PostInterface[]
}

const seoTitle = 'Доска объявлений города Иннополис';
const seoDescription = 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.'
const seoImage = '/icons/icon-192x192.png'

const Home: NextPage<HomeProps> = ({posts}) => {
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const [infinite, setInfinite] = useState(posts)
    const [input, setInput] = useState("");


    const loadFunc = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?page=${page + 1}`)
        const posts = orderBy(response.data.content, ['createdAt'], ['desc'])
        setPage((prevState: number) => prevState + 1)
        setInfinite((prevState: PostInterface[]) => [...prevState, ...posts])
        setHasMore((page + 1) < response.data.totalPages)
        return posts
    }

    return (
        <>
            <Head>
                <link rel="canonical" href="https://innoads.ru"/>
                <title>{seoTitle}</title>
                <meta name="description"
                      content={seoDescription}/>
                <meta name="keywords" content="innoads Иннополис доска объявлений"/>
                <meta name="image" content='/icons/icon-192x192.png'/>
                <meta property="og:title" content={seoTitle}/>
                <meta property="og:description" content={seoDescription}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://innoads.ru/"/>
                <meta property="og:image" content={seoImage}/>
            </Head>
            <Header/>
            <main>
                <form className={classes.search}
                >
                    <Search
                        type="text"
                        placeholder="Поиск"
                        name="search"
                        required={true}
                        input={input}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
                        style={{marginRight: 16}}
                    />
                    <Link href={{pathname: "/search", query: {keyword: input}}}>
                        <a>
                            <Button>Поиск</Button>
                        </a>
                    </Link>
                </form>
                <Premium/>

                <h1 className={classes.title}>Последние объявления</h1>
                <div className={classes.magicWrapper}>
                    <InfiniteScroll
                        pageStart={page}
                        loadMore={loadFunc}
                        hasMore={hasMore}
                        initialLoad={false}
                        threshold={100}
                        loader={<div key={0}><Spinner/></div>}
                    >
                        <ul className={classes.items}>
                            {infinite.map((post: PostInterface) => {
                                return (
                                    <Item post={post} key={post.slug}/>
                                );
                            })}
                        </ul>
                    </InfiniteScroll>
                </div>

            </main>

        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post`)
    const posts = orderBy(response.data.content, ['createdAt'], ['desc'])

    if (!posts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            posts
        },
        revalidate: 10,
    };
}

export default Home

