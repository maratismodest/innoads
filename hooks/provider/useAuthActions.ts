import { useContext } from 'react';

import { AuthActionsContext } from '@/providers/AuthProvider/AuthActionsContext';

export default function useAuthActions() {
  const authActionsContext = useContext(AuthActionsContext);

  if (authActionsContext === undefined) {
    throw new Error('useAuthContext must be used within an AppProvider');
  }
  return authActionsContext;
}
