import useValidation from '@/hooks/useValidation';
import { Option } from '@/types/global';
// import { categories } from '@/utils/categories';
import { clsx } from 'clsx';
import React from 'react';
import ReactSelect from 'react-select';

export default function Select({
  className,
  defaultValue,
  label,
  validations,
  value,
  name,
  options,
  ...props
}: any) {
  const error = useValidation(value, validations);

  return (
    <div className="grid">
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        id="select"
        data-testid={name}
        name={name}
        defaultValue={options.find((x: Option) => x.value === defaultValue)}
        className={clsx('z-20', className)}
        placeholder="Выберите категорию"
        aria-label="select"
        options={options}
        {...props}
        value={value}
      />
      {error && <span className="text-red">{error}</span>}
    </div>
  );
}
