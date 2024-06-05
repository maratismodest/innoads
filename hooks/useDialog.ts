import { DialogContext } from '@/context/DialogContext';
import { useContext } from 'react';

export default function useDialog() {
  return useContext(DialogContext);
}
