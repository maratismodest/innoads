'use client';
import Dropdown from '@/components/Dropdown';
import HeaderButtons from './HeaderButtons';
import Button from '@/components/ui/Button';
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

export default function Header() {
  const [dropdown, setDropdown] = useState(false);

  const openDropdown = useCallback(() => setDropdown(true), []);
  const closeDropdown = useCallback(() => setDropdown(false), []);

  const ref = useOnClickOutsideRef(closeDropdown);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[66px] bg-gray text-black">
      <nav className="mx-auto flex w-full max-w-[1100px] justify-between p-3">
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">Доска объявлений города Иннополис</span>
        </Link>
        <div className="lg:hidden" ref={ref}>
          <Button onClick={openDropdown}>&#8801;</Button>
          <Dropdown dropdown={dropdown}>
            <HeaderButtons className="mb-8 flex-col" onClick={closeDropdown} />
          </Dropdown>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <HeaderButtons className="ml-4 flex items-center gap-1" />
        </div>
      </nav>
    </header>
  );
}
