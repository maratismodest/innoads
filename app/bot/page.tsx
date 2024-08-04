'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import useTelegramEffects from '@/hooks/useTelegramEffects';
import { routes } from '@/utils/constants';

export default function AddPostPage() {
  const router = useRouter();

  const onSubmitOptional = useCallback(async () => {
    router.push(routes.tapper);
  }, [router]);
  const { user, loading: userLoading } = useAuth();

  useTelegramEffects();

  if (userLoading) return <Spinner />;

  if (!user) {
    return (
      <div className="text-center">
        <h1>Вы не авторизованы!</h1>
        <p>Попробуйте перезайти на сайте или перезапустить бота</p>
      </div>
    );
  }

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
}
