'use client';
import Spinner from '@/components/ui/Spinner';
import usePostQuery from '@/hooks/query/usePostQuery';
import useAuth from '@/hooks/useAuth';
import EditPostModule from '@/modules/PostModule/EditPostModule/EditPostModule';
import { routes } from '@/utils/constants';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export default function Edit<NextPage>() {
  const { user } = useAuth();
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), [router]);
  const { slug } = useParams();
  const { post, postLoading, postError } = usePostQuery(slug as string, Boolean(slug));

  if (postLoading) {
    return <Spinner />;
  }

  if (postError || !post) {
    return <h1>Ошибка</h1>;
  }

  if (!user || user.id !== post.userId) {
    return <h1>Вы не можете редактировать чужие посты</h1>;
  }

  return <EditPostModule item={post} onSubmitOptional={onSubmitOptional} />;
}
