import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/provider/useAuth';
import { routes } from '@/utils/constants';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: React.FC<P> = props => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push(routes.profile);
      }
    }, [user, router, loading]);

    if (loading) {
      return <Spinner />;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
