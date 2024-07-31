'use client';
import WebApp from '@twa-dev/sdk';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import withAuth from '@/hoc/withAuth';
import { useTelegramEffects } from '@/hooks/useTelegramEffects';
import { routes } from '@/utils/constants';

const AddPage = () => {
  const router = useRouter();
  useTelegramEffects();
  const onSubmitOptional = useCallback(async () => {
    typeof window !== 'undefined' ? WebApp.MainButton.show() : undefined;
    router.push(routes.profile);
  }, [router]);

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
};

export default withAuth(AddPage);
