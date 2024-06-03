'use client';
import withAuth from '@/hoc/withAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

const AddPage = () => {
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), []);

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
};

export default withAuth(AddPage);
