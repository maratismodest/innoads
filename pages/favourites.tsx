import Item from '@/components/Item'
import Layout from '@/components/Layout'
import {FavouriteContext} from '@/context/FavouritesContext'
import {Seo} from "@/types";
import {seo} from '@/utils/constants'
import revalidate from '@/utils/revalidate'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticProps, NextPage} from 'next/types'
import React, {useContext} from 'react'

interface FavouritesPageProps {
  seo: Seo
}

const Favourites: NextPage<FavouritesPageProps> = ({seo}) => {
  const {t} = useTranslation()
  const {favourites} = useContext(FavouriteContext)

  return (
    <Layout {...seo} className="text-center">
      <h1>{t('favourite')}</h1>
      {favourites.length > 0 ?
        <ul className='items'>
          {favourites.map((post) => <Item post={post} key={post.slug}/>)}
        </ul> :
        <h2>{t("noFavourites")}</h2>
      }
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
