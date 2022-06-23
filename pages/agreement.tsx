import {MainLayout} from 'components/MainLayout/MainLayout';
import MDX from 'components/MDX/agreement.mdx'
import {getDictionary} from 'functions/getDictionary';
import {GetStaticProps} from 'next/types';
import React from 'react';

const Agreement = () => {
    return (
        <MainLayout title='Пользовательское соглашение'>
            <MDX/>
        </MainLayout>
    );
};

export default Agreement;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await getDictionary(locale)),
        },
    };
}
