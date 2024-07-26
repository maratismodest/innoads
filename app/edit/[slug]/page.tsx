'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import EditPostModule from '@/components/PostModule/EditPostModule';
import Spinner from '@/components/ui/Spinner';
import withAuth from '@/hoc/withAuth';
import useAuth from '@/hooks/provider/useAuth';
import usePostQuery from '@/hooks/query/usePostQuery';
import { routes } from '@/utils/constants';

function EditPage<NextPage>() {
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

  if (user?.id !== post.userId) {
    return (
      <div>
        <h1>Вы не можете редактировать чужие посты</h1>
        <Link href={routes.profile}>В личный кабинет</Link>
      </div>
    );
  }

  return <EditPostModule item={post} onSubmitOptional={onSubmitOptional} />;
}

export default withAuth(EditPage);
