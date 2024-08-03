import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, FC } from 'react';

import buttonStyles from '@/styles/buttonStyles';
import type { Theme } from '@/types';
import { setTheme } from '@/utils/setTheme';

const onThemeChange = (theme: Theme) => {
  console.log('theme change', theme);
  localStorage.setItem('theme', theme);
  setTheme();
};

type Props = ComponentPropsWithoutRef<'div'>;

const ChangeTheme: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('flex items-center justify-center gap-2', className)}>
      <button className={buttonStyles()} onClick={() => onThemeChange('light')}>
        light
      </button>
      <button className={buttonStyles()} onClick={() => onThemeChange('dark')}>
        dark
      </button>
    </div>
  );
};

export default ChangeTheme;
