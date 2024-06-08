import { menu } from './HeaderButtons';
import buttonStyles from '@/styles/buttonStyles';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

interface HeaderButtonsProps extends ComponentPropsWithoutRef<'li'> {}

export default function HeaderDesktopButtons({ className, onClick }: HeaderButtonsProps) {
  return (
    <ul className={className}>
      {menu.map(({ href, text, variant }) => (
        <li key={href} className="mb-2 lg:mb-0" data-testid={href} onClick={onClick}>
          <Link href={href} className={buttonStyles({ variant: variant })}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
