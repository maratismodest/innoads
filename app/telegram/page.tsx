'use client';
import Spinner from '@/components/ui/Spinner';
import { checkToken } from '@/context/AuthContext';
import useAuth from '@/hooks/useAuth';
import PostForm from '@/modules/PostForm/PostForm';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense, useState } from 'react';

function TelegramPage() {
  const [loading, setLoading] = useState(true);
  const { login, logout, user } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      checkToken(login, logout);
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <h1>Не получили ваших данных для авторизации</h1>
        <p>Скорее всего, бот работает некорректно. Поробуйте перезапустить бота.</p>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
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
