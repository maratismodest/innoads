import Link from 'next/link';
import React from 'react';

export type Breadcrumb = { value: string; label: string };

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  separator?: React.ReactNode;
}

const defaultSeparator = <span aria-hidden="true">&#124;</span>;

export function Breadcrumbs({ breadcrumbs, separator = defaultSeparator }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map(({ value, label }, index) => {
          return (
            <li key={value} className="flex items-center gap-2">
              {index > 0 && separator}
              {index === breadcrumbs.length - 1 ? (
                <span className="truncate font-semibold" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={value} className="hover:underline" aria-disabled={true}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
