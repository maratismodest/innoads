import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

export default function useApp() {
  return useContext(AppContext);
}
