import { useContext } from 'react';

import { AppContext } from '@/providers/AppProvider/AppContext';

export default function useApp() {
  return useContext(AppContext);
}
