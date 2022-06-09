import axios from "axios";
import {orderBy} from "lodash";
import type {GetStaticProps, NextPage} from 'next'
import dynamic from "next/dynamic";
import Head from 'next/head'
import React, {useCallback, useMemo, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Button from "components/Button/Button";
import Header from "components/Header/Header";
import Item from 'components/Item/Item';
import Search from 'components/Search/Search';
import Spinner from 'components/Spinner/Spinner';
import {routes, SEO_DESCRIPTION, SEO_IMAGE, SEO_TITLE} from "../constants";
import {PostInterface} from 'interfaces';
import home from 'styles/Home.module.scss'
import classes from 'styles/classes.module.scss'
import {getUrl} from "functions/getUrl";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

const Categories = dynamic(() => import('components/Categories/Categories'), {ssr: true})

interface HomeProps {
    posts: PostInterface[]
    totalPages: number
}

type SearchSubmitForm = {
    search: string
};


const Home: NextPage<HomeProps> = ({posts, totalPages}) => {
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const {handleSubmit, register} = useForm<SearchSubmitForm>({
        defaultValues: {
            search: ''
        }
    });
    const [infinite, setInfinite] = useState<PostInterface[]>(posts)
    const count = useMemo(() => totalPages * 10, [totalPages])

    const loadFunc = useCallback(async () => {
        try {
            const response = await axios.get(getUrl(0, page + 1, 10))
            const posts = orderBy(response.data.content, ['createdAt'], ['desc'])
            setPage((prevState: number) => prevState + 1)
            setInfinite((prevState: PostInterface[]) => [...prevState, ...posts])
            setHasMore((page + 1) < response.data.totalPages)
            return posts
        } catch (e) {
            console.log(e)
            return []
        }

    }, [page])


    const onSubmit = async ({search}: SearchSubmitForm) => router.push({
        pathname: routes.search,
        query: {keyword: search},
    })

    return (
        <>
            <Head>
                <link rel="canonical" href={process.env.NEXT_PUBLIC_NODE_ENV}/>
                <title>{SEO_TITLE}</title>
                <meta name="description" content={SEO_DESCRIPTION}/>
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
                <form className={home.search} onSubmit={handleSubmit(onSubmit)}
                >
                    <Search
                        type="text"
                        placeholder="Поиск"
                        name="search"
                        required={true}
                        register={register}
                        className={home.searchInput}
                    />
                    <Button type='submit'>Поиск</Button>
                </form>
                <Categories/>
                <div className={home.header}>
                    <h1 className={classes.title}>Последние объявления</h1>
                    <span>* {count} объявлений</span>
                </div>
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

export const getStaticProps: GetStaticProps = async () => {
    const response = await axios.get(getUrl(0, 0, 10))
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

