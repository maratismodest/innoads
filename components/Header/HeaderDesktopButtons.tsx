import { menu } from './HeaderButtons';
import buttonStyles from '@/styles/buttonStyles';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

interface HeaderButtonsProps extends ComponentPropsWithoutRef<'ul'> {}

export default function HeaderDesktopButtons({ className }: HeaderButtonsProps) {
  return (
    <ul className={className}>
      {menu.map(({ href, text, variant }) => (
        <li key={href} className="mb-2 lg:mb-0" data-testid={href}>
          <Link href={href} className={buttonStyles({ variant: variant })}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
