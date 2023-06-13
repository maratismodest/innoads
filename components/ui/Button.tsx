import buttonStyles from '@/styles/buttonStyles';
import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
}

export default function Button({ className, type, children, variant, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(buttonStyles({ variant }), className)} {...props}>{children}</button>
  );
}

