import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { memo } from 'react';

const GoToProfile = memo(() => {
  const { t } = useTranslation();
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>{t('notAuthorized')}</h1>
      <Link href={routes.profile} className={buttonStyles()}>
        {t('goToAuth')}
      </Link>
    </div>
  );
});

GoToProfile.displayName = 'GoToProfile';

export default GoToProfile;


