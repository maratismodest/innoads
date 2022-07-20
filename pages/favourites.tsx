import Item from 'components/Item/Item';
import MainLayout from 'components/MainLayout/MainLayout';
import {getDictionary} from 'functions/getDictionary';
import {PostInterface} from 'interfaces';
import {GetServerSideProps} from 'next/types';
import React, {useEffect, useState} from 'react';
import classes from 'styles/classes.module.scss';

const Favourites = () => {

    const [favourites, setFavourites] = useState<PostInterface[]>([])

    useEffect(() => {
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const list = JSON.parse(favourites)
            setFavourites(list)
        }
    }, [])

    return (
        <MainLayout>
            <h1>Избранное</h1>
            <ul className={classes.items}>
                {favourites.map((post: PostInterface) => {
                    return (
                        <Item post={post} key={post.slug}/>
                    );
                })}
            </ul>
        </MainLayout>
    );
};

export default Favourites;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {

    return {
        props: {
            ...(await getDictionary(locale)),
        },
    };
}
