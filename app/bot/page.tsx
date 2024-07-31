'use client';
import WebApp from '@twa-dev/sdk';
import React from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import { useTelegramEffects } from '@/hooks/useTelegramEffects';

export default function AddPostPage() {
  const { user, loading: userLoading } = useAuth();
  const onSubmitOptional = () => WebApp.MainButton.show();

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
