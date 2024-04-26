'use client';
import Dropdown from '@/components/Dropdown';
import HeaderButtons from '@/components/Header/HeaderButtons';
import Button from '@/components/ui/Button';
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef';
import React, { useCallback, useState } from 'react';

const HeaderMobileMenu = () => {
  const [dropdown, setDropdown] = useState(false);

  const openDropdown = useCallback(() => setDropdown(true), []);
  const closeDropdown = useCallback(() => setDropdown(false), []);

  const ref = useOnClickOutsideRef(closeDropdown);
  return (
    <div className="lg:hidden" ref={ref}>
      <Button onClick={openDropdown}>&#8801;</Button>
      <Dropdown dropdown={dropdown}>
        <HeaderButtons className="mb-8 flex-col" onClick={closeDropdown} />
      </Dropdown>
    </div>
  );
};

export default HeaderMobileMenu;
