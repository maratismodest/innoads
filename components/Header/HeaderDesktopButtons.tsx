import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import buttonStyles from '@/styles/buttonStyles';

import { menu } from './HeaderButtons';

interface HeaderButtonsProps extends ComponentPropsWithoutRef<'li'> {}

export default function HeaderDesktopButtons({ className, onClick }: HeaderButtonsProps) {
  return (
    <ul className={clsx('flex', className)}>
      {menu.map(({ href, text, variant }) => (
        <li key={href} data-testid={href} onClick={onClick}>
          <Link href={href} className={buttonStyles({ variant: variant })}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
