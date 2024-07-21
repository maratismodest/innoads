// hooks/useTelegramEffects.ts
import { useCallback, useEffect } from 'react';

export function useTelegramEffects(tg: any) {
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

  const onSendData = useCallback(() => {
    const data = {
      type: 'success',
      text: 'Объявление создано!',
    };
    tg?.sendData(JSON.stringify(data));
  }, [tg]);

  useEffect(() => {
    tg?.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg?.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);
}
