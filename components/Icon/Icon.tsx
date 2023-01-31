import React, {ReactNode} from "react";
import {clsx} from 'clsx'

import classes from "./Icon.module.scss";

interface IconProps {
    children: ReactNode,
    className?: string,
    onClick?: any,
}

const Icon = ({children, className, onClick, ...props}: IconProps): JSX.Element => {
    return (
        <button className={clsx(classes.button, className)} onClick={onClick} {...props}>
            {children}
        </button>
    );
};
export default Icon;
