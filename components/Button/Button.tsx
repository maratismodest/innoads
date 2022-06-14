import cn from 'classnames';
import React, {ReactNode} from "react";
import classes from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    title?: string,
    onClick?: () => void
}

export const Button = ({children, disabled, className, title, onClick, ...props}: ButtonProps) => {
    return (
        <button className={cn(classes.button, className)}
                disabled={disabled}
                title={title}
                onClick={onClick}
                {...props}
        >
            {children}
        </button>
    )
}
export default Button
