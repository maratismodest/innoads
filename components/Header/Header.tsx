'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/utils/constants';

import HeaderDesktopButtons from './HeaderDesktopButtons';
import HeaderMobileButtons from './HeaderMobileButtons';

export default function Header() {
  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 h-header bg-gray text-black',
        'standalone:bottom-0 standalone:top-auto'
      )}
    >
      <nav
        className="mx-auto flex w-full max-w-app justify-between px-3 py-2"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <Link href={routes.main} className="hidden items-center lg:flex">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">&nbsp;|&nbsp;</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>

        <HeaderDesktopButtons className="hidden lg:flex" />
        <HeaderMobileButtons className="lg:hidden" />
      </nav>
    </header>
  );
}
