import React from "react";
import cn from 'classnames'
import classes from './Search.module.scss'

export const Search = ({children, name, required, className, register, ...props}: any) => {
    if (register) {
        return (
            <input type="text" className={cn(classes.input, className)} {...register(name, {required})} {...props}>
                {children}
            </input>
        )
    }
    return (
        <input type="text" className={cn(classes.input, className)} {...props}>
            {children}
        </input>
    )
}
export default Search
