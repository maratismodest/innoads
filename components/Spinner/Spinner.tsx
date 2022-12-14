import React from 'react';

import classes from './Spinner.module.scss'

const Spinner = (): JSX.Element => {
    return (
        <div className={classes.loader}/>
    );
};

export default Spinner;
