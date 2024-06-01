import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import HeaderDesktopButtons from './HeaderDesktopButtons';
import HeaderTabletButtons from './HeaderTabletButtons';
import HeaderMobileButtons from './HeaderMobileButtons';

export default function Header() {
  // const matches = useMediaQuery('(min-width: 768px)');

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 h-[52px] bg-gray text-black',
        'standalone:bottom-0 standalone:top-auto standalone:h-[80px]'
      )}
    >
      {/*Desktop*/}
      <nav className={clsx('mx-auto flex w-full max-w-[1100px] justify-between px-3 py-2')}>
        <Link href={routes.main} className="hidden items-center md:flex">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">&nbsp;|&nbsp;</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>

        {/*Desktop*/}
        <HeaderDesktopButtons className="hidden lg:flex" />

        {/*Tablet*/}
        <HeaderTabletButtons className="hidden md:block lg:hidden" />

        {/*Mobile*/}
        <HeaderMobileButtons className="md:hidden" />
      </nav>
    </header>
  );
}
