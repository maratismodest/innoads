import cn from 'classnames';
import React, {ReactNode} from "react";
import classes from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    className?: string
}

export const Button = ({children, disabled, className, ...props}: ButtonProps) => {
    return (
        <button className={cn(classes.button, className)} disabled={disabled} {...props} >
            {children}
        </button>
    )
}
export default Button
