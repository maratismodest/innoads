import { Role } from '@prisma/client';
import React, { ComponentType } from 'react';

import useAuth from '@/hooks/provider/useAuth';

interface AdminProps {
}

function withAdminCheck<P extends object>(
  WrappedComponent: ComponentType<P>,
): React.FC<P & AdminProps> {
  return function WithAdminCheck(props) {
    const { user, loading } = useAuth();
    if (user!.role !== Role.ADMIN) {
      return (
        <div>
          <h1>У вас нет доступа к этой странице!</h1>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAdminCheck;