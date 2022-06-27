import React, {ReactNode} from "react";
import {useDetectClickOutside} from "react-detect-click-outside";
import dropdown from './Dropdown.module.scss'

interface DropdownProps {
    closeToggle: (e: Event) => void
    children: ReactNode
}

const Dropdown = ({closeToggle, children}: DropdownProps): JSX.Element => {
    const ref = useDetectClickOutside({onTriggered: closeToggle});
    return (
        <div className={dropdown.dropdown} ref={ref}>
            {children}
        </div>
    );
};

export default Dropdown;
