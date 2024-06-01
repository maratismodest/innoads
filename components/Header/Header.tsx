import HeaderMobileButtons from './HeaderMobileButtons';
import HeaderTabletButtons from './HeaderTabletButtons';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import HeaderDesktopButtons from './HeaderDesktopButtons';

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
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between px-3 py-2',
          'hidden lg:flex'
        )}
      >
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>
        <div className="items-center gap-2">
          <HeaderDesktopButtons className="ml-4 flex items-center gap-1" />
        </div>
      </nav>

      {/*Tablet*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between px-3 py-2',
          'hidden md:flex lg:hidden'
        )}
      >
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>
        {/* Tablet*/}
        <HeaderTabletButtons />
      </nav>

      {/*Mobile*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between gap-1 px-3 py-2',
          'md:hidden'
        )}
      >
        <HeaderMobileButtons />
      </nav>
    </header>
  );
}
