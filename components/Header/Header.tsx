import HeaderMobileMenu from '@/components/Header/HeaderMobileMenu';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import HeaderButtons, { menu } from './HeaderButtons';

export default function Header() {
  return (
    <header className="fixed inset-x-0 bottom-0 z-50 h-[52px] bg-gray text-black md:top-0">
      {/*Desktop*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between px-3 py-2',
          'hidden md:flex'
        )}
      >
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>
        <HeaderMobileMenu />
        <div className="hidden items-center gap-2 lg:flex">
          <HeaderButtons className="ml-4 flex items-center gap-1" />
        </div>
      </nav>

      {/*Mobile*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between gap-1 px-3 py-2',
          'md:hidden'
        )}
      >
        <Link href={routes.main} className="mb-1 flex items-center gap-2">
          <span className="text underline">{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </Link>
        <ul className="grid w-full grid-cols-4 items-center">
          {menu.map(x => (
            <li key={x.text} className="flex flex-col justify-center">
              <Link href={x.href} title={x.text}>
                <div className="mx-auto w-fit">{x.logo}</div>
                <span className="block text-center text-xs">{x.text.substring(0, 9)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
