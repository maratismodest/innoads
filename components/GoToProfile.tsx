import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';

const GoToProfile = () => {
  const t = useTranslations();
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>{t('Не авторизованы')}</h1>
      <Link href={routes.profile} className={buttonStyles()}>
        {t('Авторизоваться')}
      </Link>
    </div>
  );
};

export default memo(GoToProfile);
