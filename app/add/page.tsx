'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import ProfileNoUser from '@/pages-lib/profile/ProfileNoUser';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export default function AddPage<NextPage>() {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), []);

  if (userLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <ProfileNoUser />;
  }

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
}
