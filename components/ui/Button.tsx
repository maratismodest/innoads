import buttonStyles from "@/components/buttonStyles";
import {VariantProps} from "class-variance-authority";
import React from 'react'
import {clsx} from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

const Button = ({className, type, children, intent, onClick, ...props}: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={clsx(buttonStyles({intent}), className)} {...props}>{children}</button>
  )
}

export default Button
