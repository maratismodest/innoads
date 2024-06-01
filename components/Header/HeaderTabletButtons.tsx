'use client';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/ui/Button';
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef';
import React, { ComponentPropsWithoutRef, useCallback, useState } from 'react';
import HeaderDesktopButtons from './HeaderDesktopButtons';

const HeaderTabletButtons = ({ className }: ComponentPropsWithoutRef<'div'>) => {
  const [dropdown, setDropdown] = useState(false);

  const openDropdown = useCallback(() => setDropdown(true), []);
  const closeDropdown = useCallback(() => setDropdown(false), []);

  const ref = useOnClickOutsideRef(closeDropdown);
  return (
    <div className={className} ref={ref}>
      <Button onClick={openDropdown}>&#8801;</Button>
      <Dropdown dropdown={dropdown}>
        <HeaderDesktopButtons className="mb-8 flex-col" onClick={closeDropdown} />
      </Dropdown>
    </div>
  );
};

export default HeaderTabletButtons;
