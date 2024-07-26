import { useContext } from 'react';

import { ToastContext } from '@/providers/ToastProvider/ToastContext';

export default function useToast() {
  return useContext(ToastContext);
}
