import inputStyles from "@/styles/inputStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type Props = React.HTMLProps<HTMLInputElement> & VariantProps<typeof inputStyles>;

const Input = ({className, variant, ...props}: Props): JSX.Element => {
  return (
    <input className={clsx(inputStyles({variant}), className)} {...props} />
  )
}

export default Input
