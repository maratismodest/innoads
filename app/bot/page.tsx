'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import PostForm from '@/modules/PostForm/PostForm';
import React, { Suspense, useEffect, useState } from 'react';

function TelegramPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user]);

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
