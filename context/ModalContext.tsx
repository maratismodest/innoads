import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

import Modal from '@/components/Modal'

type modalContextType = {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    modalValue: any;
    setModalValue: Dispatch<SetStateAction<any>>;
};

const modalContextDefaultValues: modalContextType = {
    modal: false,
    setModal: () => {
    },
    modalValue: null,
    setModalValue: () => {
    },
}
export const ModalContext = createContext<modalContextType>(modalContextDefaultValues)

type Props = {
    children: ReactNode;
};

export function ModalProvider({ children }: Props) {
    const [modal, setModal] = useState(false)
    const [modalValue, setModalValue] = useState(null)

    const value = {
        modal, setModal, modalValue, setModalValue,
    }

    return (
        <ModalContext.Provider value={value}>
            <Modal visible={modal}>
                {modalValue}
            </Modal>
            {children}
        </ModalContext.Provider>
    )
}
