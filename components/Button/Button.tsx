import React from "react";
import classes from './Button.module.scss'

export const Button = ({children, ...props}: any) => {
    return (
        <button className={classes.button} {...props}>
            {children}
        </button>
    )
}
export default Button
