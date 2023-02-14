import React from 'react';

import classes from './Switch.module.css'


interface SwitchProperties {
    id: string;

    label?: string;

    onChange: (isChecked: boolean) => void;

    "data-on"?: string;

    isChecked: boolean;

    "data-off"?: string;

    description?: string;
}

const Switch: React.FC<SwitchProperties> = (props) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event.target.checked);
    };

    const labelId = `label-${props.id}`;
    const descriptionId = `description-${props.id}`;

    const labelBy = labelId + ' ' + descriptionId;

    return (
        <label htmlFor={props.id} className={classes.switch}>
            <input
                id={props.id}
                type="checkbox"
                role="switch"
                data-on={props['data-on']}
                checked={props.isChecked}
                data-off={props['data-off']}
                onChange={onChange}
                aria-checked={props.isChecked}
                aria-labelledby={labelBy}
            />
            <div className={classes.switchLabels}>
                {props.label && <span id={labelId}>{props.label}</span>}
                {props.description && <p id={descriptionId}>{props.description}</p>}
            </div>
        </label>
    );
}

export default Switch;
