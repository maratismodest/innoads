import { clsx } from 'clsx';
import React from 'react';

type Props = React.HTMLProps<HTMLInputElement> & {};

export function Switcher({ checked, onChange }: Props) {
  return (
    <div className="relative inline-flex cursor-pointer gap-2">
      <input
        type="checkbox"
        className="absolute z-20 h-full w-full cursor-pointer opacity-0"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={clsx(
          'flex h-6 w-11 items-center rounded-full bg-blue px-1',
          checked && 'justify-end'
        )}
      >
        <div className={clsx('h-4 w-4 rounded-full bg-white')} />
      </div>
    </div>
  );
}
