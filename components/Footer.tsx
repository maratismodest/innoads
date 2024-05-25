import buttonStyles from '@/styles/buttonStyles';
import clsx from 'clsx';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray">
      <a className={clsx(buttonStyles({ variant: 'secondary' }), 'w-full')} href="#">
        Наверх
      </a>
    </footer>
  );
}
