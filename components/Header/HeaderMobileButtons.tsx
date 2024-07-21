import clsx from 'clsx';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

import { menu, menuHome } from './HeaderButtons';

const mobileMenu = [menuHome].concat(menu);

export default function HeaderMobileButtons({ className }: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul className={clsx('grid w-full grid-cols-5 items-center', className)}>
      {mobileMenu.map(({ text, href, logo }) => (
        <li key={href} className="flex flex-col justify-center">
          <Link href={href} title={text}>
            <div className="mx-auto w-fit">{logo}</div>
            <span className="block text-center text-xs">{text.substring(0, 9)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
