import React, {ReactNode} from "react";
import dropdown from './Dropdown.module.scss'
import useOnClickOutsideRef from "hooks/useOnClickOutsideRef";

interface DropdownProps {
    closeToggle: (e: Event) => void
    children: ReactNode
}

const Dropdown = ({closeToggle, children}: DropdownProps): JSX.Element => {
    const modalRef = useOnClickOutsideRef(() => closeToggle)

    return (
        <div className={dropdown.dropdown} ref={modalRef}>
            {children}
        </div>
    );
};

export default Dropdown;
