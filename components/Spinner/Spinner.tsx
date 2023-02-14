import React from 'react';

import classes from './Spinner.module.css'

const Spinner = (): JSX.Element => {
    return (
        <div className={classes.loader}/>
    );
};

export default Spinner;
