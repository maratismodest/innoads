'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 5000);
    }
  }, [isOpen]);

  const value = {
    toast: (message: string) => {
      setMessage(message);
      setIsOpen(true);
    },
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast isOpen={isOpen} onClose={onClose} message={message} />
      {children}
    </ToastContext.Provider>
  );
}
