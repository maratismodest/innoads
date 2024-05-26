import Link from 'next/link';
import React from 'react';

const separator = <span>&nbsp;&#124;&nbsp;</span>;
export type Breadcrumb = { value: string; label: string };
const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <ul className="flex truncate">
      {breadcrumbs.map(({ value, label }, index) => (
        <React.Fragment key={value}>
          {index > 0 && separator}
          <li className="hover:underline">
            <Link href={value}>{label}</Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
