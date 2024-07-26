import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { clsx } from 'clsx';
import React, { FC } from 'react';

import buttonStyles from '@/styles/buttonStyles';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ children, title }) => {
  return (
    <Disclosure>
      <DisclosureButton className="w-full py-2">
        <p className={clsx(buttonStyles({ size: 'small' }))}>{title}</p>
      </DisclosureButton>
      <DisclosurePanel className="text-gray-500">{children}</DisclosurePanel>
    </Disclosure>
  );
};
