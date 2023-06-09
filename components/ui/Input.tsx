import useValidation from "@/hooks/useValidation";
import {PostOptions} from "@/modules/PostForm/PostForm";
import inputStyles from "@/styles/inputStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type InputProps = React.HTMLProps<HTMLInputElement> & VariantProps<typeof inputStyles> & {
  options: PostOptions
}

export default function Input({
                                className,
                                variant,
                                label,
                                value,
                                name,
                                onChange,
                                type,
                                options,
                                ...props
                              }: InputProps) {
  const error = useValidation(value, options)
  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} name={name} value={value} type={type} className={clsx(inputStyles({variant}), className)}
             onChange={onChange} {...props} />
      {error && <span className='text-red'>{error}</span>}
    </div>
  )
}
