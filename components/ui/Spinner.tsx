import React, { HTMLProps } from 'react';
import { clsx } from 'clsx';

type Props = HTMLProps<HTMLDivElement>

export default function Spinner({ className }: Props) {
  return (
    <div className={clsx('flex items-center justify-center p-8', className)}>
      <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-blue'></div>
    </div>
  );
}


