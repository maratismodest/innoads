'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type modalContextType = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

const modalContextDefaultValues: modalContextType = {
  modal: false,
  setModal: () => {},
};
export const ModalContext = createContext<modalContextType>(modalContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const [modal, setModal] = useState(false);

  const value = {
    modal,
    setModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
