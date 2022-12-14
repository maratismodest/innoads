import React from 'react'
import cn from 'classnames'

import classes from './Button.module.scss'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    transparent?: boolean
}

const Button = ({
                    children,
                    className,
                    type,
                    transparent,
                    ...props
                }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(classes.button, className, { [classes.buttonTransparent]: transparent })}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
