import { menu, menuHome } from './HeaderButtons';
import Link from 'next/link';
import React from 'react';

const mobileMenu = [menuHome].concat(menu);

export default function HeaderMobileButtons() {
  return (
    <ul className="grid w-full grid-cols-5 items-center">
      {mobileMenu.map(({ text, href, logo }) => (
        <li key={href} className="flex flex-col justify-center">
          <Link href={href} title={text}>
            <div className="mx-auto w-fit">{logo}</div>
            <span className="block text-center text-xs">{text.substring(0, 9)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
