import React, {ReactNode} from "react";
import {useDetectClickOutside} from "react-detect-click-outside";
import dropdown from './Dropdown.module.scss'

interface DropdownProps {
    closeToggle: () => void;
    children: ReactNode
}

const Dropdown = ({closeToggle, children}: DropdownProps) => {
    const ref = useDetectClickOutside({onTriggered: closeToggle});
    return (
        <div className={dropdown.dropdown} ref={ref}>
            {children}
        </div>
    );
};

export default Dropdown;