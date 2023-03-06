import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React, {useContext} from 'react'
import {FavouriteContext} from '@/context/FavouritesContext'
import {PostDTO} from '@/types/PostDTO'
import {seo} from '@/utils/constants'
import revalidate from '@/utils/revalidate'

import Item from '@/components/Item'
import Layout from '@/components/Layout'

const Favourites: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({seo}) => {
  const {t} = useTranslation()
  const {favourites} = useContext(FavouriteContext)

  return (
    <Layout {...seo}>
      <h1>{t('favourite')}</h1>
      {favourites.length > 0 ? <ul className='items'>
        {favourites.map((post: PostDTO) => <Item post={post} key={post.slug}/>)}
      </ul> : <h2>{t("noFavourites")}</h2>}
    </Layout>
  )
}
export default Favourites

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      seo: seo.favourites,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}
