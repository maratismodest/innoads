import HeaderMobileMenu from '@/components/Header/HeaderMobileMenu';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import HeaderButtons, { menu } from './HeaderButtons';

export default function Header() {
  return (
    <header className="standalone:h-[80px] fixed inset-x-0 bottom-0 z-50 h-[80px] bg-gray text-black md:top-0 md:h-[52px]">
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
          'standalone:h-fit mx-auto flex h-full w-full max-w-[1100px] justify-between gap-1 px-3 py-2',
          'md:hidden'
        )}
      >
        <ul className="grid w-full grid-cols-5 items-center">
          <li key={routes.main} className="flex flex-col justify-center">
            <Link href={routes.main}>
              <div className="mx-auto w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <span className="block text-center text-xs">На главную</span>
            </Link>
          </li>
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
