import React from 'react'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'

interface DropdownProps extends React.HTMLProps<HTMLDivElement> {
    closeToggle: (e: Event) => void
}

const Dropdown = ({closeToggle, children}: DropdownProps): JSX.Element => {
    const modalRef = useOnClickOutsideRef(() => closeToggle)

    return (
        <div className='absolute right-0 top-0 min-h-[100vh] min-w-[50vw] rounded-l-md bg-white px-6 py-10 shadow'
             ref={modalRef}>
            {children}
        </div>
    )
}

export default Dropdown
