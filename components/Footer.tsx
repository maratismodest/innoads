'use client'
import Button from '@/components/ui/Button';
import scrollToTop from '@/utils/scrollToTop';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray'>
      <Button variant="secondary" className='mx-auto flex justify-center' onClick={scrollToTop}>Обратно</Button>
    </footer>
  );
};

export default Footer;
