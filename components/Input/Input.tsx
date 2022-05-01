import React from "react";
import classes from './Input.module.css'

export const Input = ({children, name, required, register, ...props}: any) => {
    if (register) {
        return (
            <input type="text" className={classes.input} {...register(name, { required })} {...props}>
                {children}
            </input>
        )
    }
    return (
        <input type="text" className={classes.input} {...props}>
            {children}
        </input>
    )
}
export default Input
