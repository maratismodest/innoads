'use client';
import { createContext } from 'react';

type toastContextType = {
  toast: (message: string) => void;
};

const toastContextDefaultValues: toastContextType = {
  toast: () => {
  },
};

export const ToastContext = createContext<toastContextType>(toastContextDefaultValues);


