'use client';
import React, { ComponentPropsWithoutRef, useCallback, useRef, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import useClickOutside from '@/hooks/useClickOutside';
import buttonStyles from '@/styles/buttonStyles';

import HeaderDesktopButtons from './HeaderDesktopButtons';

const HeaderTabletButtons = ({ className }: ComponentPropsWithoutRef<'div'>) => {
  const [dropdown, setDropdown] = useState(false);

  const openDropdown = useCallback(() => setDropdown(true), []);
  const closeDropdown = useCallback(() => setDropdown(false), []);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, closeDropdown);
  return (
    <div className={className} ref={ref}>
      <button className={buttonStyles()} onClick={openDropdown}>
        &#8801;
      </button>
      <Dropdown dropdown={dropdown}>
        <HeaderDesktopButtons className="mb-8 flex-col" onClick={closeDropdown} />
      </Dropdown>
    </div>
  );
};

export default HeaderTabletButtons;
