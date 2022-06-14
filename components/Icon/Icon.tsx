import cn from 'classnames'
import React, {MouseEventHandler, ReactNode} from "react";
import classes from "./Icon.module.scss";


interface IconProps {
    children: ReactNode,
    className?: string,
    onClick?: any,
}

const Icon = ({children, className, onClick, ...props}: IconProps) => {
    return (
        <button className={cn(classes.button, className)} onClick={onClick} {...props}>
            {children}
        </button>
    );
};
export default Icon;
