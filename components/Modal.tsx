import React, { useEffect, useRef } from 'react'

interface ModalProps extends React.HTMLProps<HTMLDialogElement> {
    visible: boolean
}

const Modal = ({ visible, children, className = '' }: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (ref.current) {
            if (visible) {
                ref.current.showModal()
            } else {
                ref.current.close()
            }
        }
    }, [visible])
    return <dialog ref={ref} className={className}>{children}</dialog>
}

export default Modal
