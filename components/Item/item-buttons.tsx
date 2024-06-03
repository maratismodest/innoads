import buttonStyles from '@/styles/buttonStyles';
import clsx from 'clsx';
import React from 'react';
import { ItemModalText } from './utils';

interface ItemButtonsProps {
  showModal: (text: ItemModalText) => void;
}

const buttons = [
  {
    title: 'Снять с публикации',
    classNames: [buttonStyles(), 'absolute z-10', 'right-0 top-0'],
    text: ItemModalText.delete,
    icon: <>&#10008;</>,
  },
] as const;

const ItemButtons = ({ showModal }: ItemButtonsProps) => {
  return (
    <>
      {buttons.map(({ title, text, icon, classNames }) => (
        <button
          key={title}
          title="Снять с публикации"
          className={clsx(classNames)}
          onClick={event => {
            event.preventDefault();
            showModal(text);
          }}
        >
          {icon}
        </button>
      ))}
    </>
  );
};

export default ItemButtons;
