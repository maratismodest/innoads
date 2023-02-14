import React, { ReactNode } from 'react'
import { clsx } from 'clsx'

interface IconProps {
    children: ReactNode,
    className?: string,
    onClick?: any,
}


const Icon = ({ children, className, onClick, ...props }: IconProps): JSX.Element => {
    return (
        <button
            className={clsx('h-9 w-9 mb-2 cursor-pointer rounded bg-green text-white p-2 shadow hover:hover:shadow-lg', className)}
            onClick={onClick} {...props}>
            {children}
        </button>
    )
}
export default Icon
