import { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

import buttonStyles from '@/styles/buttonStyles';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export function Button({ className, type, children, variant, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(buttonStyles({ variant }), className)} {...props}>
      {children}
    </button>
  );
}
