import inputStyles from "@/styles/inputStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type InputProps = React.HTMLProps<HTMLInputElement> & VariantProps<typeof inputStyles>

export default function Input({className, variant, label, name, ...props}: InputProps): JSX.Element {
  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} name={name} className={clsx(inputStyles({variant}), className)} {...props} />
    </div>
  )
}
