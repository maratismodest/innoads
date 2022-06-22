import {options} from "assets/options";
import axios from "axios";
import {Input} from "components/Input/Input";
import Item from "components/Item/Item";
import {MainLayout} from "components/MainLayout/MainLayout";
import SelectInno from "components/Select/Select";
import Spinner from "components/Spinner/Spinner";
import {getUrl} from "functions/getUrl";
import useDebounce from "hooks/useDebounce";
import {PostInterface} from "interfaces";
import {orderBy} from "lodash";
import type {GetStaticProps, NextPage} from 'next'
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {isMobile} from "react-device-detect";
import InfiniteScroll from 'react-infinite-scroller';
import classes from 'styles/classes.module.scss'

type SearchSubmitForm = {
    search: string
    category: number
};

const SearchPage: NextPage = () => {
    const {t, i18n} = useTranslation(['common', 'search'])
    const router = useRouter();
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [infinite, setInfinite] = useState([])
    const [input, setInput] = useState("");
    const [category, setCategory] = useState(Number(router.query['category']) || 1);
    const debouncedValue = useDebounce<string>(input, 500)

    const translatedOptions = useMemo(() => options.map((option) => {
        return {
            ...option, label: t(option.label)
        }
    }), [t])

    const loadFunc = useCallback(async (currentPage: number = page) => {
        const response = await axios.get(getUrl(category, currentPage, isMobile ? 8 : 15, debouncedValue))
        const posts: PostInterface[] = orderBy(response.data.content, ['createdAt'], ['desc'])
        setPage(prevState => prevState + 1)
        // @ts-ignore
        setInfinite((prevState: PostInterface[]) => currentPage === 0 ? posts : [...prevState, ...posts])
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
            <h1 className={classes.title}>{t('search', {ns: 'search'})}</h1>
            <hr/>
            <SelectInno
                options={translatedOptions}
                name="category"
                required={true}
                onChange={(event: any) => {
                    setCategory(event.value);
                }}
                value={translatedOptions.find(x => x.value === category)}
            />
            <Input
                type="text"
                placeholder={t('typeText', {ns: 'search'})}
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

export default SearchPage

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common', 'search'])),
        },
    };
}