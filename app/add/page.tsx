'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import withAuth from '@/hoc/withAuth';
import { routes } from '@/utils/constants';

const AddPage = () => {
  const router = useRouter();

  const onSubmitOptional = useCallback(async () => {
    router.push(routes.tapper);
  }, [router]);

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
};

export default withAuth(AddPage);
