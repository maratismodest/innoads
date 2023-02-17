import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React, {useContext} from 'react'
import {FavouriteContext} from 'context/FavouritesContext'
import {PostInterface} from 'types'
import {seo} from 'utils/constants'
import revalidate from 'utils/revalidate'

import Item from 'components/Item'
import Layout from 'components/Layout'

const Favourites: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({seo}) => {
    const {t} = useTranslation()
    const {favourites} = useContext(FavouriteContext)

    return (
        <Layout {...seo}>
            <h1>{t('favourite')}</h1>
            <ul className='items'>
                {favourites.map((post: PostInterface) => <Item post={post} key={post.slug}/>)}
            </ul>
        </Layout>
    )
}
export default Favourites

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            seo: seo.favourites,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate: revalidate
    }
}
