import type {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {InferGetStaticPropsType, NextPage} from 'next/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React, {useState} from 'react'
import InfinitePosts from "modules/InfinitePosts";
import {seo} from 'utils/constants'
import {selectOptions, SelectProps} from "utils/options";
import revalidate from 'utils/revalidate'

import Layout from 'components/Layout'
import Select from 'components/Select';

const SearchPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({seo}) => {
  const {t} = useTranslation()
  const router = useRouter()
  const [category, setCategory] = useState<SelectProps>(
    selectOptions.find(x => x.value === Number(router.query['categoryId'])) || selectOptions[0],
  )

  return (
    <Layout {...seo}>
      <h1>{t('search')}</h1>
      <hr/>
      <Select onChange={setCategory}/>
      <hr/>
      <InfinitePosts initPage={0} initPosts={[]} options={{categoryId: category.value}}/>
    </Layout>
  )
}

export default SearchPage

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'search',
      ])),
      seo: seo.search,
    },
    revalidate: revalidate,
  }
}
