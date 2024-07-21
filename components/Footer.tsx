import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

import { routes, tgLink } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="сontainer bg-gray p-4">
      {/*<a className={clsx(buttonStyles({ variant: 'secondary' }), 'w-full')} href="#">*/}
      {/*  Наверх*/}
      {/*</a>*/}
      <div className="mx-auto max-w-[1100px] gap-4">
        <ul>
          <li className="hover:underline">
            <Link href={routes.blog + '/rules'}>Правила InnoAds</Link>
          </li>
          <li className="hover:underline">
            <Link href={tgLink + '/innoads'}>Канал InnoAds</Link>
          </li>
        </ul>
        <hr className="border-white" />
        <p>&copy;{dayjs().get('year')} InnoAds.ru</p>
      </div>
    </footer>
  );
}
