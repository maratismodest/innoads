import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React from 'react'
import PostForm from 'modules/PostForm/PostForm'
import {seo} from 'utils/constants'

import Layout from 'components/Layout'

const Add: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({seo}) => {
  return (
    <Layout {...seo}>
      <PostForm/>
    </Layout>
  )
}
export default Add

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      seo: seo.add,
      ...(await serverSideTranslations(locale as string)),
    },
  }
}
