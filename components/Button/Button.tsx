import React from "react";
import classes from './Button.module.scss'


export const Button = ({children, disabled, ...props}: any) => {
    return (
        <button className={classes.button} disable={disabled} {...props} >
            {children}
        </button>
    )
}
export default Button
