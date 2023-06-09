import PostForm from '@/modules/PostForm/PostForm'
import {postDefaultValues, PostFormValues} from '@/modules/PostForm/utils';
import type {PostDTO, Seo} from "@/types";
import fetchPost from "@/utils/api/fetchAd";
import {categories} from '@/utils/categories'
import React from 'react'

type Props = {
  post: PostDTO,
  seo: Seo
}

export default async function EditPage<NextPage>({params}: { params: any }) {
  const post = await fetchPost(params.slug as string)
  const {categoryId, title, body, price} = post
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find((category) => category.value === categoryId)?.value || 1,
    body,
    title,
    price,
  }
  return (
    <>
      <PostForm defaultValues={editValues} post={post}/>
    </>
  )
}
