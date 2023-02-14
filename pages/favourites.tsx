import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useContext } from 'react'
import { FavouriteContext } from 'context/FavouritesContext'
import { PostInterface } from 'types'
import { descriptions, titles } from 'utils/constants'
import revalidate from 'utils/revalidate'

import Item from 'components/Item/Item'
import Layout from 'components/Layout'

import classes from 'styles/classes.module.css'


const Favourites: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    const { t } = useTranslation()
    const { favourites } = useContext(FavouriteContext)

    return (
        <Layout title={titles.favourites} description={descriptions.favourites}>
            <h1>{t('favourite')}</h1>
            <ul className={classes.items}>
                {favourites.map((post: PostInterface) => <Item post={post} key={post.slug} />)}
            </ul>
        </Layout>
    )
}
export default Favourites

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate:revalidate
    }
}
