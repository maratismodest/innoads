'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import withAuth from '@/hoc/withAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule';
import { routes } from '@/utils/constants';

const AddPage = () => {
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), [router]);

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
};

export default withAuth(AddPage);
