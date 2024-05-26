'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import useTelegram from '@/hooks/useTelegram';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import React, { useEffect } from 'react';

export default function AddPostPage() {
  const { user, loading: userLoading } = useAuth();
  const { tg } = useTelegram();
  const onSubmitOptional = () => tg?.MainButton.show();

  useEffect(() => {
    if (tg?.colorScheme) {
      localStorage.setItem('colorScheme', tg.colorScheme);
    }
  }, [tg?.colorScheme]);

  useEffect(() => {
    tg?.MainButton.setParams({
      text: 'Закрыть окно',
    });
  }, [tg?.MainButton]);

  const onSendData = () => {
    const data = {
      type: 'success',
      text: 'Объявление создано!',
    };
    tg?.sendData(JSON.stringify(data));
  };

  useEffect(() => {
    tg?.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg?.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

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
  return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
}
