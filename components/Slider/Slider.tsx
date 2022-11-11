import React from 'react';
import classes from './Slider.module.scss'

const Slider = () => {
    return (
        <div>
            <ul className={classes.list}>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
                <li className={classes.item}>block</li>
            </ul>
        </div>
    );
};

export default Slider;