// 'use client';
// import Button from '@/components/ui/Button';
import buttonStyles from '@/styles/buttonStyles';
// import scrollToTop from '@/utils/scrollToTop';
import clsx from 'clsx';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray">
      <a className={clsx(buttonStyles({ variant: 'secondary' }), 'w-full')} href="#">
        Наверх
      </a>
    </footer>
  );
};

export default Footer;
