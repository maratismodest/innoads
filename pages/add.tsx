import Layout from '@/components/Layout'
import PostForm from '@/modules/PostForm/PostForm'
import type {Seo} from "@/types";
import {seo} from '@/utils/constants'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {GetStaticProps} from 'next/types'
import React from 'react'

type Props = {
  seo: Seo
}

export default function Add<NextPage>({seo}: Props) {
  return (
    <Layout {...seo}>
      <PostForm/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      seo: seo.add,
      ...(await serverSideTranslations(locale as string)),
    },
  }
}
