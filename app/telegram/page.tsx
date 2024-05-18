'use client';
import Spinner from '@/components/ui/Spinner';
import { checkToken } from '@/context/AuthContext';
import useAuth from '@/hooks/useAuth';
import PostForm from '@/modules/PostForm/PostForm';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react';

function TelegramPage() {
  const { login, logout } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      checkToken(login, logout);
    }
  }, [token]);

  if (!token) {
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
