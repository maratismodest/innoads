import buttonStyles from "@/styles/buttonStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

const Button = ({className, type, children, variant, onClick, ...props}: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={clsx(buttonStyles({variant}), className)} {...props}>{children}</button>
  )
}

export default Button
