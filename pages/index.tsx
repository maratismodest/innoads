import axios from "axios";
import {orderBy} from "lodash";
import type {GetStaticProps, NextPage} from 'next'
import dynamic from "next/dynamic";
import Head from 'next/head'
import Link from 'next/link';
import React, {useCallback, useMemo, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Item from '../components/Item/Item';
import Search from '../components/Search/Search';
import Spinner from '../components/Spinner/Spinner';
import {SEO_DESCRIPTION, SEO_IMAGE, SEO_TITLE} from "../constants";
import {PostInterface} from '../interfaces';
import classes from './../styles/Home.module.scss'
// import Categories from "../components/Categories/Categories";


const Categories = dynamic(() => import('../components/Categories/Categories'), {ssr: true})

interface HomeProps {
    posts: PostInterface[]
    totalPages: number
}

const Home: NextPage<HomeProps> = ({posts, totalPages}) => {
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const [infinite, setInfinite] = useState(posts)
    const [input, setInput] = useState("");
    const count = useMemo(() => totalPages * 12, [totalPages])

    const loadFunc = useCallback(async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?page=${page + 1}&size=10`)
        const posts = orderBy(response.data.content, ['createdAt'], ['desc'])
        setPage((prevState: number) => prevState + 1)
        setInfinite((prevState: PostInterface[]) => [...prevState, ...posts])
        setHasMore((page + 1) < response.data.totalPages)
        return posts
    }, [page])

    return (
        <>
            <Head>
                <link rel="canonical" href={process.env.NEXT_PUBLIC_NODE_ENV}/>
                <title>{SEO_TITLE}</title>
                <meta name="description"
                      content={SEO_DESCRIPTION}/>
                <meta name="keywords" content="innoads, Иннополис, доска объявлений"/>
                <meta name="image" content='/icons/icon-192x192.png'/>
                <meta property="og:title" content={SEO_TITLE}/>
                <meta property="og:description" content={SEO_DESCRIPTION}/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_NODE_ENV}/>
                <meta property="og:image" content={SEO_IMAGE}/>
                <meta name="author" content="InnoAds"/>
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
                <Categories/>
                <p style={{textAlign: 'right'}}>* {count} объявлений на сайте</p>
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?size=10`)
    const posts = orderBy(response.data.content, ['createdAt'], ['desc'])

    if (!posts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            posts,
            totalPages: response.data.totalPages,
        },
        revalidate: 10,
    };
}

export default Home

