import Layout from '@/components/Layout'
import PostForm from '@/modules/PostForm/PostForm'
import {Seo} from "@/types";
import {seo} from '@/utils/constants'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticProps, NextPage} from 'next/types'
import React from 'react'

type Props = {
  seo: Seo
}

const Add: NextPage<Props> = ({seo}) => {
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
