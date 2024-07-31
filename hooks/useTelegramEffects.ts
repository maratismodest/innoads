import WebApp from '@twa-dev/sdk';
import { useCallback, useEffect } from 'react';

export function useTelegramEffects() {
  useEffect(() => {
    if (WebApp.colorScheme) {
      localStorage.setItem('colorScheme', WebApp.colorScheme);
    }
  }, [WebApp.colorScheme]);

  useEffect(() => {
    WebApp.MainButton.setParams({
      text: 'Закрыть окно',
    });
  }, [WebApp.MainButton]);

  const onSendData = useCallback(() => {
    const data = {
      type: 'success',
      text: 'Объявление создано!',
    };
    WebApp.sendData(JSON.stringify(data));
  }, [WebApp]);

  useEffect(() => {
    WebApp.onEvent('mainButtonClicked', onSendData);
    return () => {
      WebApp.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, WebApp]);
}
