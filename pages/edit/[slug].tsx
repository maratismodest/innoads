import fetchPost from "@/utils/api/fetchAd";
import type {GetServerSideProps} from 'next'
import {InferGetServerSidePropsType, NextPage} from 'next/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React from 'react'
import PostForm from '@/modules/PostForm/PostForm'
import {postDefaultValues, PostFormValues} from '@/modules/PostForm/utils';
import {seo} from '@/utils/constants'
import {categories} from '@/utils/options'

import Layout from '@/components/Layout'

const Edit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({post, seo}) => {
  const {categoryId, title, body, price} = post
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find((x) => x.value === categoryId)?.value || 1,
    body,
    title,
    price,
  }
  return (
    <Layout {...seo}>
      <PostForm defaultValues={editValues} post={post}/>
    </Layout>
  )
}

export default Edit

export const getServerSideProps: GetServerSideProps = async ({
                                                               locale,
                                                               query,
                                                             }) => {
  const post = await fetchPost(query.slug as string)
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
      seo: seo.edit,
      ...(await serverSideTranslations(locale as string)),
    },
  }
}
