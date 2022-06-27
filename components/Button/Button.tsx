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
    id?: string,
    transparent? : boolean
}

export const Button = ({id, children, disabled, className, title, type, onClick, transparent,...props}: ButtonProps) => {
    return (
        <button
            id={id}
            className={cn(classes.button, className, {[classes.transparent]: transparent})}
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
