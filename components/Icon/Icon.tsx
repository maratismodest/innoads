import React from "react";
import cn from 'classnames'
import classes from "./Icon.module.scss";

const Icon = ({children, className, ...props}: any) => {
    return (
        <button className={cn(classes.button, className)} {...props}>
            {children}
        </button>
    );
};
export default Icon;
