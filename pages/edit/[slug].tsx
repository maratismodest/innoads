import Layout from '@/components/Layout'
import PostForm from '@/modules/PostForm/PostForm'
import {postDefaultValues, PostFormValues} from '@/modules/PostForm/utils';
import {Seo} from "@/types";
import {PostDTO} from "@/types/PostDTO";
import fetchPost from "@/utils/api/fetchAd";
import {categories} from '@/utils/categories'
import {seo} from '@/utils/constants'
import type {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {NextPage} from 'next/types'
import React from 'react'

type Props = {
  post: PostDTO,
  seo: Seo
}

const Edit: NextPage<Props> = ({post, seo}) => {
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
