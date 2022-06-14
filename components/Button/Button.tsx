import cn from 'classnames';
import React, {ReactNode} from "react";
import classes from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    title?: string
}

export const Button = ({children, disabled, className, title,...props}: ButtonProps) => {
    return (
        <button className={cn(classes.button, className)} disabled={disabled} title={title} {...props} >
            {children}
        </button>
    )
}
export default Button
