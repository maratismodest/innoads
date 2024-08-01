'use client';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export default function useTelegramEffects() {
  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp?.colorScheme) {
      localStorage.setItem('colorScheme', WebApp.colorScheme);
    }
  }, [WebApp?.colorScheme, window]);
}
