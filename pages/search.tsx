import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {orderBy} from "lodash";
import {useRouter} from "next/router";
import axios from "axios";
import type {NextPage, GetStaticProps} from 'next'
import {PostInterface} from "../interfaces";
import useDebounce from "../hooks/useDebounce";
import {MainLayout} from "../components/MainLayout/MainLayout";
import SelectInno from "../components/Select/Select";
import {options} from "../assets/options";
import Item from "../components/Item/Item";
import classes from "../styles/Index.module.scss";
import {Input} from "../components/Input/Input";
import Spinner from "../components/Spinner/Spinner";

interface SearchPageProps {
    posts: PostInterface[]
}

const SearchPage: NextPage<SearchPageProps> = ({posts}) => {
    const router = useRouter();
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [infinite, setInfinite] = useState(posts)
    const [input, setInput] = useState("");
    const [category, setCategory] = useState(1);
    const debouncedValue = useDebounce<string>(input, 500)

    const loadFunc = useCallback(async (currentPage: number = page) => {
        console.log("currentPage", currentPage)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?page=${currentPage}&category=${category}&text=${debouncedValue}`)
        const posts = orderBy(response.data.content, ['createdAt'], ['desc'])
        setPage(prevState => prevState + 1)
        setInfinite(prevState => currentPage === 0 ? posts : [...prevState, ...posts])
        setHasMore((currentPage + 1) < response.data.totalPages)
    }, [page, category, debouncedValue])


    useEffect(() => {
        loadFunc(0)
    }, [debouncedValue, category])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    useEffect(() => {
        const res = router.query['keyword']
        if (res && typeof res === 'string') {
            setInput(res)
        }

    }, [router.query]);

    return (
        <MainLayout title="Доска объявлений города Иннополис">
            <h1 className={classes.title}>Поиск</h1>
            <hr/>
            <SelectInno
                options={options}
                name="category"
                required={true}
                defaultValue={options[0]}
                onChange={(event: any) => {
                    setCategory(event.value);
                }}
            />
            <Input
                type="text"
                placeholder="поиск"
                name="search"
                required={true}
                defaultValue={router.query.keyword}
                value={input}
                onChange={handleChange}
                style={{marginTop: 10, width: "-webkit-fill-available"}}
            />
            <hr/>
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
        </MainLayout>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?category=1`)
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

export default SearchPage