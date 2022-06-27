import cn from 'classnames'
import React, {ReactNode} from "react";
import classes from "./Icon.module.scss";


interface IconProps {
    children: ReactNode,
    className?: string,
    onClick?: any,
}

const Icon = ({children, className, onClick, ...props}: IconProps): JSX.Element => {
    return (
        <button className={cn(classes.button, className)} onClick={onClick} {...props}>
            {children}
        </button>
    );
};
export default Icon;
