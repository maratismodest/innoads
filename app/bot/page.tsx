'use client';
import Spinner from '@/components/ui/Spinner';
import { useTelegram } from '@/context/TelegramContext';
import useAuth from '@/hooks/useAuth';
import PostForm from '@/modules/PostForm/PostForm';
import React, { Suspense, useEffect, useState } from 'react';

function TelegramPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { webApp } = useTelegram();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user]);

  useEffect(() => {
    webApp?.MainButton.setParams({
      text: 'Закрыть окно',
    });
    webApp?.MainButton.show();
  }, [webApp?.MainButton]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div>
        <h1>Не получили ваших данных для авторизации</h1>
        <p>Скорее всего, бот работает некорректно. Поробуйте перезапустить бота.</p>
      </div>
    );
  }

  return <PostForm />;
}

export default function TelegramPageWrapper() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <TelegramPage />
    </Suspense>
  );
}
