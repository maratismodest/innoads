import Arrow from '@/components/Arrow';
import { Option } from '@/types/global';
import { Listbox } from '@headlessui/react';
import { clsx } from 'clsx';
import React, { Fragment } from 'react';

interface NewSelectProps {
  options: Option[];
  onChange: (active: Option) => void;
  value?: Option;
}
const NewSelect = ({ options, onChange, value }: NewSelectProps) => {
  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Button className="flex h-9 w-full items-center justify-between rounded border border-inputBorder px-4 text-start">
              {value?.label}
              <div className={clsx('ml-auto', open && 'rotate-180 transition ease-in-out')}>
                <Arrow />
              </div>
            </Listbox.Button>
            <Listbox.Options className="absolute top-10 z-50 w-full rounded bg-white p-2 drop-shadow-md">
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
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default NewSelect;
