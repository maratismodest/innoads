'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

import Toast from '@/components/Toast';

type toastContextType = {
  toast: boolean;
  setToast: Dispatch<SetStateAction<boolean>>;
  toastValue: any;
  setToastValue: Dispatch<SetStateAction<any>>;
};

const toastContextDefaultValues: toastContextType = {
  toast: false,
  setToast: () => {},
  toastValue: null,
  setToastValue: () => {},
};
export const ToastContext = createContext<toastContextType>(toastContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [toast, setToast] = useState(false);
  const [toastValue, setToastValue] = useState(null);

  const value = {
    toast,
    setToast,
    toastValue,
    setToastValue,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast toast={toast} setToast={setToast} />
      {children}
    </ToastContext.Provider>
  );
}
