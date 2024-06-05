'use client';
import CloseIcon from '@/public/svg/close.svg';
import { messages } from '@/utils/messages';
import { CloseButton, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type dialogContextType = {
  dialog: (message: string, timer?: number) => void;
};

const dialogContextDefaultValues: dialogContextType = {
  dialog: () => {},
};
export const DialogContext = createContext<dialogContextType>(dialogContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function DialogProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string | undefined>(undefined);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setDialogMessage(undefined);
  }, []);

  const value: dialogContextType = {
    dialog: (message: string) => {
      setIsOpen(true);
      setDialogMessage(message);
    },
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => onClose(), 5000);
    }
  }, [isOpen]);

  return (
    <DialogContext.Provider value={value}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50 flex justify-end pr-2">
        <div className="fixed top-[56px] h-fit w-fit">
          <DialogPanel className="flex items-center gap-2 rounded border border-gray-light bg-white px-2 py-1 text-sm shadow-2xl">
            <DialogTitle className="mb-0 text-base">
              {dialogMessage ?? messages.somethingWentWrong}
            </DialogTitle>
            <CloseButton as="button">
              <CloseIcon className="size-3" />
            </CloseButton>
          </DialogPanel>
        </div>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
}
