import React from "react";
import {useDetectClickOutside} from "react-detect-click-outside";
import dropdown from './Dropdown.module.scss'

const Dropdown = ({closeToggle, children}: any) => {
    const ref = useDetectClickOutside({onTriggered: closeToggle});
    return (
        <div className={dropdown.dropdown} ref={ref}>
            {children}
        </div>
    );
};

export default Dropdown;