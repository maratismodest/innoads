'use client';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import Toast from '@/components/ui/Toast';

import { ToastContext } from './ToastContext';

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const onClose = useCallback(() => {
    setIsOpen(false);
    setMessage(undefined);
  }, []);

  const toast = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 5000);
    }
  }, [isOpen]);

  const value = useMemo(
    () => ({
      toast,
    }),
    [toast]
  );

  return (
    <ToastContext.Provider value={value}>
      <Toast isOpen={isOpen} onClose={onClose} message={message} />
      {children}
    </ToastContext.Provider>
  );
}
