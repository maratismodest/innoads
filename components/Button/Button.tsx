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
    transparent?: boolean
}

const Button = ({
                    children,
                    id,
                    disabled,
                    className,
                    title,
                    type,
                    onClick,
                    transparent,
                    ...props
                }: ButtonProps): JSX.Element => {
    return (
        <button
            id={id}
            className={cn(classes.button, className, {[classes.buttonTransparent]: transparent})}
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
