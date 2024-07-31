import WebApp from '@twa-dev/sdk';
import { useCallback, useEffect } from 'react';

const onSendData = () => {
  const data = {
    type: 'success',
    text: 'Объявление создано!',
  };
  WebApp.sendData(JSON.stringify(data));
};

export function useTelegramEffects() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (WebApp.colorScheme) {
        localStorage.setItem('colorScheme', WebApp?.colorScheme);
      }
    }
  }, [WebApp.colorScheme, window]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp.MainButton.setParams({
        text: 'Закрыть окно',
      });
    }
  }, [WebApp.MainButton, window]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      WebApp.onEvent('mainButtonClicked', onSendData);
      return () => {
        WebApp.offEvent('mainButtonClicked', onSendData);
      };
    }
  }, [onSendData, WebApp, window]);
}
