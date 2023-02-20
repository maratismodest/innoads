import React from 'react'
import { clsx } from 'clsx'

type Props = React.HTMLProps<HTMLInputElement> & {}

const Input = ({ className, ...props }: Props): JSX.Element => {
    return (
        <input className={clsx('input', className)} {...props} />
    )
}

export default Input
