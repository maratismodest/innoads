import { useContext } from 'react';

import { AuthContext } from '@/providers/AuthProvider/AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}
