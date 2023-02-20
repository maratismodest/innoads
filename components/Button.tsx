import React from 'react'
import { clsx } from 'clsx'

type Props = React.HTMLProps<HTMLButtonElement> & {}

const Button = ({ className, type, children, ...props }: Props): JSX.Element => {
    return (
        <button className={clsx('button', className)} {...props}>{children}</button>
    )
}

export default Button
