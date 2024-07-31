'use client';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

// const isWindow = typeof window !== 'undefined';
const onSendData = () => {
  const data = {
    type: 'success',
    text: 'Объявление создано!',
  };
  WebApp.sendData(data);
  WebApp.close();
};

export function useTelegramEffects() {
  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp?.colorScheme) {
      localStorage.setItem('colorScheme', WebApp.colorScheme);
    }
  }, [WebApp?.colorScheme, window]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp.MainButton.setText('Закрыть окно');
    }
  }, [WebApp?.MainButton, window]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp?.onEvent('mainButtonClicked', onSendData);
      return () => {
        WebApp?.offEvent('mainButtonClicked', onSendData);
      };
    }
  }, [onSendData, WebApp, window]);
}
