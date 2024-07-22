import React, { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

export interface ModalProps extends ComponentPropsWithoutRef<'dialog'> {
  visible: boolean;
}

export default function Modal({ visible, children, className = '' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (visible) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    }
  }, [visible]);

  return (
    <dialog ref={ref} className={className}>
      <div className="p-4">{children}</div>
    </dialog>
  );
}
