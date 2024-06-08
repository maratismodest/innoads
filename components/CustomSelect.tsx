import ArrowSvg from '@/public/svg/arrow.svg';
import { Option } from '@/types/global';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { clsx } from 'clsx';
import React, { Fragment } from 'react';

interface CustomSelectProps {
  options: Option[];
  onChange?: (active: number) => void;
  value?: number;
}

function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton className="flex h-9 w-full items-center justify-between rounded border border-inputBorder px-4 text-start">
              {options.find(x => x.value === value)?.label ?? (
                <span className="text-gray-dark">Выберите категорию</span>
              )}
              <div className={clsx('ml-auto', open && 'rotate-180 transition ease-in-out')}>
                <ArrowSvg className="size-6" />
              </div>
            </ListboxButton>
            <ListboxOptions className="absolute top-10 z-50 w-full rounded bg-white p-2 drop-shadow-md">
              {options.map(category => (
                <ListboxOption key={category.value} value={category} as={Fragment}>
                  {({ focus, selected }) => (
                    <li
                      className={clsx('cursor-pointer rounded p-2', focus && 'bg-blue text-white')}
                    >
                      {category.label}
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default CustomSelect;
