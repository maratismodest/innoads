import HeaderMobileMenu from '@/components/Header/HeaderMobileMenu';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';
import HeaderButtons from './HeaderButtons';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[66px] bg-gray text-black">
      <nav className="mx-auto flex w-full max-w-[1100px] justify-between p-3">
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">Доска объявлений города Иннополис</span>
        </Link>
        <HeaderMobileMenu />
        <div className="hidden items-center gap-2 lg:flex">
          <HeaderButtons className="ml-4 flex items-center gap-1" />
        </div>
      </nav>
    </header>
  );
}
