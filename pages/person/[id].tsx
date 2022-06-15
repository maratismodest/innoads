import axios from 'axios';
import Button from 'components/Button/Button';
import Item from 'components/Item/Item';
import {MainLayout} from 'components/MainLayout/MainLayout';
import {getUrl} from 'functions/getUrl';
import {PostInterface} from 'interfaces';
import {orderBy} from 'lodash';
import Link from 'next/link';
import {GetServerSideProps, NextPage} from 'next/types';
import React from 'react';
import classes from 'styles/classes.module.scss'
import {tgLink} from '../../constants';


interface PersonProps {
    posts: PostInterface[],
    totalPages: number
}

const Person: NextPage<PersonProps> = ({posts, totalPages}) => {

    return (
        <MainLayout>
            <h1>Профиль продавца</h1>
            <p>Количество объявлений: <span>{posts.length}</span></p>

            <div style={{marginTop: 40}}/>
            <ul className={classes.items}>
                {posts.map((post: PostInterface) => {
                    return (
                        <Item post={post} key={post.slug}/>
                    );
                })}
            </ul>
            <div style={{marginTop: 40}}/>
            <Link href={tgLink + '/' + posts[0].telegram} passHref>
                <Button>
                    Написать автору
                </Button>
            </Link>
        </MainLayout>
    );
};

export default Person;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await axios.get(getUrl(0, 0, 10, '', +(context.query.id as string)))

    if (!response) {
        return {
            notFound: true,
        };
    }
    const posts = orderBy(response.data.content, ['createdAt'], ['desc'])
    return {
        props: {
            posts: posts,
            totalPages: response.data.totalPages,
        }
    };
}
