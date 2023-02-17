import React from 'react'
import {clsx} from 'clsx'

interface IconProps extends React.HTMLProps<HTMLButtonElement> {
}

const Icon = ({children, className, onClick, type = 'button', ...props}: IconProps): JSX.Element => {
    return (
        <button
            className={clsx('h-9 w-9 cursor-pointer rounded bg-green text-white shadow hover:hover:shadow-lg', className)}
            onClick={onClick} {...props}>
            {children}
        </button>
    )
}
export default Icon
