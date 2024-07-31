'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import withAuth from '@/hoc/withAuth';
import useTelegram from '@/hooks/provider/useTelegram';
import { routes } from '@/utils/constants';

const AddPage = () => {
  const router = useRouter();
  const { tgUserData } = useTelegram();

  const onSubmitOptional = useCallback(
    async () => (!tgUserData ? router.push(routes.profile) : undefined),
    [router, tgUserData]
  );

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
};

export default withAuth(AddPage);
