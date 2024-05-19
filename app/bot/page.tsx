'use client';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import { useTelegram } from '@/hooks/useTelegram';
import PostForm from '@/modules/PostForm/PostForm';
import React, { Suspense, useCallback, useEffect, useState } from 'react';

function TelegramPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { tg } = useTelegram();

  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false);
      },
      user ? 0 : 1000
    );
  }, [user]);

  useEffect(() => {
    tg?.MainButton.show();
  }, []);

  useEffect(() => {
    if (tg && tg.MainButton) {
      tg?.MainButton.setParams({
        text: 'Закрыть окно',
      });
      // tg?.MainButton.show();
    }
  }, [tg?.MainButton]);

  const onSendData = useCallback(() => {
    const data = {
      type: 'success',
      text: 'Объявление подано в канал!',
    };
    tg?.sendData(JSON.stringify(data));
  }, [tg]);

  useEffect(() => {
    tg?.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg?.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

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

  return (
    <>
      <div>{JSON.stringify(tg?.MainButton)}</div>
      <PostForm
        additionalAction={() => {
          tg?.MainButton.show();
          onSendData();
        }}
      />
    </>
  );
}

export default function TelegramPageWrapper() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <TelegramPage />
    </Suspense>
  );
}
