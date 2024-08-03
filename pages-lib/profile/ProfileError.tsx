import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import buttonStyles from '@/styles/buttonStyles';

type Props = {
  onClick: () => void;
};

const ProfileError: FC<Props> = ({ onClick }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center gap-8">
      <h1>{t('Что-то пошло не так')}</h1>
      <button className={buttonStyles()} onClick={onClick}>
        {t('Попробовать снова')}
      </button>
    </div>
  );
};

export default ProfileError;
