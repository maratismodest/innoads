import clsx from 'clsx';
import React from 'react';

import RepublishSvg from '@/public/svg/republish.svg';
import TrashSvg from '@/public/svg/trash.svg';
import buttonStyles from '@/styles/buttonStyles';

import { ItemModalText } from './Item.helpers';

const buttons = [
  // {
  //   title: 'Редактировать',
  //   classNames: [buttonStyles(), 'absolute z-10', 'left-0 top-0'],
  //   text: ItemModalText.edit,
  //   icon: <>&#10008;</>,
  // },
  {
    title: 'Опубликать заново',
    classNames: [buttonStyles(), 'absolute z-10', 'left-0 top-0'],
    text: ItemModalText.republish,
    icon: <RepublishSvg className="size-4" />,
  },
  {
    title: 'Снять с публикации',
    classNames: [buttonStyles(), 'absolute z-10', 'right-0 top-0'],
    text: ItemModalText.archive,
    icon: <TrashSvg className="size-4" />,
  },
] as const;

interface ItemButtonsProps {
  showModal: (text: ItemModalText) => void;
}

const ItemButtons = ({ showModal }: ItemButtonsProps) => {
  return (
    <>
      {buttons.map(({ title, text, icon, classNames }) => (
        <button
          key={title}
          title={title}
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
