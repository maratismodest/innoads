import React from "react";
import cn from 'classnames';
import classes from './Button.module.scss'


export const Button = ({children, disabled, className, ...props}: any) => {
    return (
        <button className={cn(classes.button, className)} disable={disabled} {...props} >
            {children}
        </button>
    )
}
export default Button
