import MainLayout from 'components/MainLayout/MainLayout';
import MDX from 'components/MDX/delete.mdx'
import {getDictionary} from 'functions/getDictionary';
import {GetStaticProps} from 'next/types';
import React from 'react';

const Delete = () => {
    return (
        <MainLayout title='Чтобы удалить свои данные, напишие к нам запрос'>
            <MDX/>
        </MainLayout>
    );
};

export default Delete;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await getDictionary(locale)),
        },
    };
}
