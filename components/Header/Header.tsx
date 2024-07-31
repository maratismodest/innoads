'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import useDeviceType from '@/hooks/useDeviceType';
import { routes } from '@/utils/constants';

import HeaderDesktopButtons from './HeaderDesktopButtons';
import HeaderMobileButtons from './HeaderMobileButtons';
import HeaderTabletButtons from './HeaderTabletButtons';

export default function Header() {
  const device = useDeviceType();
  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 h-header bg-gray text-black',
        'standalone:bottom-0 standalone:top-auto'
        // 'standalone:h-[80px]'
      )}
    >
      {/*Common*/}
      <nav className={clsx('max-w-app mx-auto flex w-full justify-between px-3 py-2')}>
        <Link href={routes.main} className="hidden items-center md:flex">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">&nbsp;|&nbsp;</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>

        {/*Desktop*/}
        {device === 'desktop' && <HeaderDesktopButtons />}

        {/*Tablet*/}
        {device === 'tablet' && <HeaderTabletButtons />}

        {/*Mobile*/}
        {device === 'mobile' && <HeaderMobileButtons />}
      </nav>
    </header>
  );
}
