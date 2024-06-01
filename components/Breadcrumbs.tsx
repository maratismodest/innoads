import Link from 'next/link';
import { Fragment } from 'react';

const separator = <span>&nbsp;&#124;&nbsp;</span>;
export type Breadcrumb = { value: string; label: string };

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <ul className="flex truncate">
      {breadcrumbs.map(({ value, label }, index) => (
        <Fragment key={value}>
          {index > 0 && separator}
          <li className="hover:underline">
            <Link href={value}>{label}</Link>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
