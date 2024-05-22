import Button from '@/components/ui/Button';
import { DialogPanel, DialogTitle, Dialog } from '@headlessui/react';
import React from 'react';

interface PopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  buttons: {
    text: string;
    onClick: () => void;
  }[];
}

const Popup = ({ isOpen, setIsOpen, text, buttons }: PopupProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="mx-auto max-w-sm rounded bg-white p-4">
            <DialogTitle>{text}</DialogTitle>
            <hr />
            <div className="mt-12 flex justify-around">
              {buttons.map(x => (
                <Button onClick={x.onClick} key={x.text}>
                  {x.text}
                </Button>
              ))}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Popup;
