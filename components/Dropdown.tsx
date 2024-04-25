import { clsx } from 'clsx';
import React from 'react';

interface DropdownProps extends React.HTMLProps<HTMLDivElement> {
  dropdown: boolean;
}

export default function Dropdown({ dropdown, children }: DropdownProps) {
  return (
    <div
      className={clsx(
        'absolute top-0 min-h-[100vh] min-w-[50vw] rounded-l-md bg-white px-6 py-10 shadow transition-all duration-300 ease-out',
        dropdown ? 'right-0' : '-right-full'
      )}
    >
      {children}
    </div>
  );
}
