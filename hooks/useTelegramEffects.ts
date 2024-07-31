'use client';
import WebApp from '@twa-dev/sdk';
import { useCallback, useEffect } from 'react';

// const isWindow = typeof window !== 'undefined';
const onSendData = () => {
  if (typeof window !== 'undefined' && WebApp) {
    const data = {
      type: 'success',
      text: 'Объявление создано!',
    };
    WebApp.sendData(data);
  }
};

export function useTelegramEffects() {
  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp?.colorScheme) {
      localStorage.setItem('colorScheme', WebApp.colorScheme);
    }
  }, [WebApp?.colorScheme, window]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp?.MainButton.setParams({
        text: 'Закрыть окно',
      });
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
