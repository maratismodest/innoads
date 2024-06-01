import ArrowSvg from '@/public/svg/arrow.svg';
import { Option } from '@/types/global';
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import { clsx } from 'clsx';
import React, { Fragment } from 'react';

interface SelectProps {
  options: Option[];
  onChange: (active: Option) => void;
  value?: Option;
  name?: string;
}

export default function Select({ options, onChange, value, name }: SelectProps) {
  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton className="flex h-9 w-full items-center justify-between rounded border border-inputBorder px-4 text-start">
              {value?.label ?? <span className="text-gray-dark">Выберите категорию</span>}
              <div className={clsx('ml-auto', open && 'rotate-180 transition ease-in-out')}>
                <ArrowSvg className="size-6" />
              </div>
            </ListboxButton>
            <ListboxOptions className="absolute top-10 z-50 w-full rounded bg-white p-2 drop-shadow-md">
              {options.map(category => (
                <Listbox.Option key={category.value} value={category} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={clsx('cursor-pointer rounded p-2', active && 'bg-blue text-white')}
                    >
                      {category.label}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </div>
  );
}
