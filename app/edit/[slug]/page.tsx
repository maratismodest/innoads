'use client';
import Spinner from '@/components/ui/Spinner';
import PostForm from '@/modules/PostForm/PostForm';
import { postDefaultValues, PostFormValues } from '@/modules/PostForm/utils';
import type { PostDTO } from '@/types';
import fetchPost from '@/utils/api/fetchAd';
import { categories } from '@/utils/categories';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Edit<NextPage>() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDTO | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string).then(res => setPost(res));
    }

  }, [slug]);

  if (!post) {
    return <Spinner />;
  }

  const { categoryId, title, body, price } = post;
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find((category) => category.value === categoryId)?.value || 1,
    body,
    title,
    price,
  };

  return (
    <PostForm defaultValues={editValues} post={post} />
  );
}
