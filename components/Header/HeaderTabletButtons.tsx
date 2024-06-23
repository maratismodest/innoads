'use client';
import Dropdown from '@/components/Dropdown';
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef';
import buttonStyles from '@/styles/buttonStyles';
import React, { ComponentPropsWithoutRef, useCallback, useState } from 'react';
import HeaderDesktopButtons from './HeaderDesktopButtons';

const HeaderTabletButtons = ({ className }: ComponentPropsWithoutRef<'div'>) => {
  const [dropdown, setDropdown] = useState(false);

  const openDropdown = useCallback(() => setDropdown(true), []);
  const closeDropdown = useCallback(() => setDropdown(false), []);

  const ref = useOnClickOutsideRef(closeDropdown);
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
