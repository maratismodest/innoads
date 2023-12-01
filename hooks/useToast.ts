import { ToastContext } from '@/context/ToastContext';
import { useContext } from 'react';

export default function useToast() {
  return useContext(ToastContext);
}
