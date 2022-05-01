import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import classes from "../styles/Index.module.scss";
import InfiniteScroll from 'react-infinite-scroller';
import _ from "lodash";
import {useRouter} from "next/router";
import axios from "axios";
import {GetStaticProps, NextPage} from "next/types";
import {PostInterface} from "../interfaces";
import useDebounce from "../hooks/useDebounce";
import {MainLayout} from "../components/MainLayout/MainLayout";
import SelectInno from "../components/Select/Select";
import {options} from "../assets/options";
import {Input} from "../components/Input/Input";
import Item from "../components/Item/Item";

interface SearchProps {
    posts: PostInterface[]
}


const Posts: NextPage<SearchProps> = ({posts}) => {
    const router = useRouter();
    const [infinite, setInfinite] = useState(posts);
    const [category, setCategory] = useState(1);
    const [input, setInput] = useState<string>("");
    const debouncedValue = useDebounce<string>(input, 500)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const loadFunc = useCallback(async (currentPage: number = page) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?page=${currentPage}&category=${category}&text=${input}`)
        const posts = _.orderBy(response.data.content, ['createdAt'], ['desc'])
        setPage(currentPage + 1)
        setInfinite(prevState => currentPage === 0 ? posts : [...prevState, ...posts])
        setHasMore((currentPage + 1) < response.data.totalPages)
        return posts
    }, [category, input, page])

    useEffect(() => {
        loadFunc(0).then((res) => setInfinite(res))
    }, [debouncedValue, loadFunc])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    useEffect(() => {
        const res = router.query['keyword']
        if (res && typeof res === 'string') {
            setInput(res)
        }

    }, [router.query]);


    useEffect(() => {
        loadFunc(0).then((res) => {
            setInfinite(res);
        })
    }, [category, loadFunc]);

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
                    loader={<div key={0}>Loading ...</div>}
                >
                    <ul className={classes.items}>
                        {infinite.map((post: PostInterface) => {
                            return (
                                <Item post={post} key={post.id}/>
                            );
                        })}
                    </ul>
                </InfiniteScroll>
            </div>
        </MainLayout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // const res = await serverSideTranslations(context.locale, ["translate"]);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post`)
    const posts = _.orderBy(response.data.content, ['createdAt'], ['desc']);

    if (!posts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            posts,
            // ...(await serverSideTranslations(locale, ["translate"])),
        }, // will be passed to the page component as props
        revalidate: 10,
    };
}

export default Posts