import React from "react";
import classes from "./Icon.module.scss";

const Icon = ({ children, ...props }: any) => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};
export default Icon;
