'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import React from 'react';

export default function AddPostPage() {
  const { user, loading: userLoading } = useAuth();

  if (userLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="text-center">
        <h1>Вы не авторизованы!</h1>
        <p>Попробуйте перезайти на сайте или перезапустить бота</p>
      </div>
    );
  }
  return <CreatePostModule />;
}
