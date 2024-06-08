import dayjs from 'dayjs';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray p-2">
      {/*<a className={clsx(buttonStyles({ variant: 'secondary' }), 'w-full')} href="#">*/}
      {/*  Наверх*/}
      {/*</a>*/}
      <p className="text-center">&copy;{dayjs().get('year')} InnoAds.ru</p>
    </footer>
  );
}
