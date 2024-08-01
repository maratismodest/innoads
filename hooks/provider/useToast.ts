import { useContext } from 'react';

import { ToastContext } from '@/providers/ToastProvider/ToastContext';

export default function useToast() {
  const toastContext = useContext(ToastContext);
  if (!toastContext) throw new Error('useToast must be used within a ToastProvider');
  return useContext(ToastContext);
}
