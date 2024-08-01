'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import CreatePostModule from '@/components/PostModule/CreatePostModule';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import useTelegram from '@/hooks/provider/useTelegram';
import { useTelegramAppEffects } from '@/hooks/useTelegramAppEffects';
import { routes } from '@/utils/constants';

export default function AddAppPostPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuth();
  const { tgUserData, tgLoading } = useTelegram();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), [router]);

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
