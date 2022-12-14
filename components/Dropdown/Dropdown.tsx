import React from 'react'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'

import dropdown from './Dropdown.module.scss'

interface DropdownProps extends React.HTMLProps<HTMLDivElement> {
    closeToggle: (e: Event) => void
}

const Dropdown = ({ closeToggle, children }: DropdownProps): JSX.Element => {
    const modalRef = useOnClickOutsideRef(() => closeToggle)

    return (
        <div className={dropdown.dropdown} ref={modalRef}>
            {children}
        </div>
    )
}

export default Dropdown
