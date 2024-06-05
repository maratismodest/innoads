'use client';
import Toast from '@/components/Toast';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type toastContextType = {
  toast: (message: string) => void;
};

const toastContextDefaultValues: toastContextType = {
  toast: () => {},
};
export const ToastContext = createContext<toastContextType>(toastContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
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
