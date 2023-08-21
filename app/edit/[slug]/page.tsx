'use client'
import Layout from '@/components/Layout';
import Spinner from '@/components/ui/Spinner';
import PostForm from '@/modules/PostForm/PostForm';
import {postDefaultValues, PostFormValues} from '@/modules/PostForm/utils';
import type {Seo, PostDTO} from '@/types';
import fetchPost from '@/utils/api/fetchAd';
import {categories} from '@/utils/categories';
import {seo} from '@/utils/constants';
import type {GetServerSideProps} from 'next';
import {useParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';

type Props = {
  post: PostDTO,
  seo: Seo
}

export default function Edit<NextPage>() {
  const {slug} = useParams()
  const [post, setPost] = useState<PostDTO | undefined>(undefined)

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string).then(res => setPost(res));
    }

  }, [slug])

  if (!post) {
    return <Spinner/>
  }

  const {categoryId, title, body, price} = post;
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find((category) => category.value === categoryId)?.value || 1,
    body,
    title,
    price
  };
  return (
    // <Layout {...seo}>
    <PostForm defaultValues={editValues} post={post}/>
    // </Layout>
  );
}
