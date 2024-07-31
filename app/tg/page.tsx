'use client';
import WebApp from '@twa-dev/sdk';
import React from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import useTelegram from '@/hooks/provider/useTelegram';
import { useTelegramAppEffects } from '@/hooks/useTelegramAppEffects';

export default function AddAppPostPage() {
  const { user, loading: userLoading } = useAuth();
  const { tgUserData, tgLoading } = useTelegram();
  const onSubmitOptional = () =>
    typeof window !== 'undefined' ? WebApp.MainButton.show() : undefined;

  useTelegramAppEffects();

  if (userLoading || tgLoading) return <Spinner />;

  if (!tgUserData && !user) {
    return (
      <div className="text-center">
        <h1>Вы не авторизованы!</h1>
        <p>Попробуйте перезапустить приложение.</p>
      </div>
    );
  }

  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
}
