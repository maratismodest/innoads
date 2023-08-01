import { clsx } from 'clsx';
import React, { memo } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
}

const Spinner = memo(({ className }: Props) => {
  return (
    <div className={clsx('flex items-center justify-center p-8', className)}>
      <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-blue'></div>
    </div>
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;



