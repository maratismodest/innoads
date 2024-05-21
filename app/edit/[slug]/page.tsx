'use client';
import Spinner from '@/components/ui/Spinner';
import EditPostModule from '@/modules/PostModule/EditPostModule/EditPostModule';
import fetchPost from '@/api/prisma/fetchAd';
import { routes } from '@/utils/constants';
import { Post } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function Edit<NextPage>() {
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), []);
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

  return <EditPostModule item={post} onSubmitOptional={onSubmitOptional} />;
}
