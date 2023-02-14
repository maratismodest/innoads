import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    transparent?: boolean
}

const Button = ({
                    children,
                    className,
                    type,
                    transparent = false,
                    ...props
                }: ButtonProps) => {
    return (
        <button
            className={clsx('text-white bg-blue rounded-lg px-4 py-2 w-fit cursor-pointer shadow hover:hover:shadow-lg', className, transparent && 'bg-none text-blue border-none')}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
