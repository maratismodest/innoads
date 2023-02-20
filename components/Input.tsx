import React from 'react'
import { clsx } from 'clsx'

interface InputInterface extends React.HTMLProps<HTMLInputElement> {

}

const Input = ({ className, ...props }: InputInterface): JSX.Element => {
    return (
        <input className={clsx('input', className)} {...props} />
    )
}

export default Input
