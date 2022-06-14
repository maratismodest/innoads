import cn from 'classnames';
import React, {ReactNode} from "react";
import classes from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    title?: string,
    onClick?: () => void,
    type?: 'submit' | 'reset' | 'button';
    id?: string
}

export const Button = ({id, children, disabled, className, title, type, onClick, ...props}: ButtonProps) => {
    return (
        <button
            id={id}
            className={cn(classes.button, className)}
            disabled={disabled}
            title={title}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export default Button
