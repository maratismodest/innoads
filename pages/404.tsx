import Link from "next/link";
import {GetStaticProps, NextPage} from "next/types";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React from 'react';
import {Routes} from "utils/routes";

import Button from "components/Button/Button";
import Layout from "components/Layout/Layout";

const ErrorPage: NextPage = () => {
    const {t} = useTranslation()
    return (
        <Layout title='Страница не найдена' description='Перейдите на главную'>
            <div className='center'>
                <h1>{t('pageNotFound')}</h1>
                <Link href={Routes.main}>
                    <Button className='block-center'>{t('onMain')}</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default ErrorPage;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'common'
            ])),
        },
    }
}