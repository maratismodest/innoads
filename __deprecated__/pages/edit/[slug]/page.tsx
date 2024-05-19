'use client';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import PostForm from '@/__deprecated__/modules/PostForm/PostForm';
import { postDefaultValues, PostFormValues } from '@/__deprecated__/modules/PostForm/utils';
import fetchPost from '@/utils/api/prisma/fetchAd';
import { Post } from '@prisma/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Edit<NextPage>() {
  const { categories } = useApp();
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string).then(res => {
        if (res) {
          setPost(res);
        }
      });
    }
  }, []);

  if (!post) {
    return <Spinner />;
  }

  const { categoryId, title, body, price } = post;
  const editValues: PostFormValues = {
    ...postDefaultValues,
    categoryId: categories.find(category => category.value === categoryId)?.value || 1,
    body,
    title,
    price,
  };

  return <PostForm defaultValues={editValues} post={post} />;
}
