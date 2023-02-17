import Link from 'next/link'
import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React from 'react'
import {seo} from "utils/constants";
import revalidate from 'utils/revalidate'
import {Routes} from 'utils/routes'

import Layout from 'components/Layout'

const ErrorPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({seo}) => {
    const {t} = useTranslation()
    return (
        <Layout {...seo} className='flex'>
            <div className='flex w-full flex-col items-center justify-center'>
                <h1>{t('pageNotFound')}</h1>
                <Link href={Routes.main}>
                    <button className='button'>{t('onMain')}</button>
                </Link>
            </div>
        </Layout>
    )
}

export default ErrorPage

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            seo: seo.notFound,
            ...(await serverSideTranslations(locale as string, [
                'common',
            ])),
        },
        revalidate: revalidate
    }
}
