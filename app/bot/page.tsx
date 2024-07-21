'use client';
import React from 'react';

import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import useTelegram from '@/hooks/useTelegram';
import { useTelegramEffects } from '@/hooks/useTelegramEffects';
import CreatePostModule from '@/modules/PostModule/CreatePostModule';

export default function AddPostPage() {
  const { user, loading: userLoading } = useAuth();
  const { tg } = useTelegram();
  const onSubmitOptional = () => tg?.MainButton.show();

  useTelegramEffects(tg);

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
