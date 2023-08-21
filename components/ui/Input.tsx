import useValidation from '@/hooks/useValidation';
import {PostOptions} from '@/modules/PostForm/PostForm';
import inputStyles from '@/styles/inputStyles';
import {VariantProps} from 'class-variance-authority';
import {clsx} from 'clsx';
import React from 'react';

type InputProps = React.HTMLProps<HTMLInputElement> & VariantProps<typeof inputStyles> & {
  options: PostOptions
}

export default function Input({
                                className,
                                variant,
                                label,
                                value,
                                options,
                                name,
                                ...props
                              }: InputProps) {
  const error = useValidation(value, options);
  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <input className={clsx(inputStyles({variant}), className)} {...props} data-testid={name} value={value} />
      {error && <span className='text-red'>{error}</span>}
    </div>
  );
}
