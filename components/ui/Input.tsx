import inputStyles from "@/styles/inputStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type InputProps = React.HTMLProps<HTMLInputElement> & VariantProps<typeof inputStyles>

export default function Input({className, variant, label, name, onChange, type, ...props}: InputProps): JSX.Element {
  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} name={name} type={type} className={clsx(inputStyles({variant}), className)}
             onChange={onChange} {...props} />
    </div>
  )
}
