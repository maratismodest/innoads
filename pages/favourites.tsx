import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { PostInterface } from 'types'
import useLocalStorageState from 'use-local-storage-state'
import { descriptions, titles } from 'utils/constants'

import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'


const Favourites: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    const { t } = useTranslation()
    const [favourites] = useLocalStorageState<PostInterface[]>('favourites', {
        defaultValue: [],
    })

    return (
        <MainLayout title={titles.favourites} description={descriptions.favourites}>
            <h1>{t('favourite')}</h1>
            <ul className={classes.items}>
                {favourites.map((post: PostInterface) => <Item post={post} key={post.slug} />)}
            </ul>
        </MainLayout>
    )
}
export default Favourites

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
