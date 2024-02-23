import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';

import Link from 'next/link';
import React, { memo } from 'react';

const GoToProfile = memo(() => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Не авторизованы</h1>
      <Link href={routes.profile} className={buttonStyles()}>
        Авторизоваться
      </Link>
    </div>
  );
});

GoToProfile.displayName = 'GoToProfile';

export default GoToProfile;
