import { postButtonStyles } from './utils';
import clsx from 'clsx';
import React from 'react';

interface LeftRightButtonsProps {
  current: number;
  images: string[];
  handleClick: (direction: 'left' | 'right') => void;
}

const LeftRightButtons = ({ current, images, handleClick }: LeftRightButtonsProps) => {
  return (
    <>
      <button
        className={clsx(
          postButtonStyles,
          'absolute top-1/2 hidden -translate-y-1/2',
          'left-0',
          current !== 0 && images.length > 1 && '!block'
        )}
        onClick={() => handleClick('left')}
        hidden={current === 0 || images.length < 2}
      >
        &larr;
      </button>
      <button
        className={clsx(
          postButtonStyles,
          'absolute top-1/2 hidden -translate-y-1/2',
          'right-0',
          current + 1 < images.length && images.length > 1 && '!block'
        )}
        onClick={() => handleClick('right')}
      >
        &rarr;
      </button>
    </>
  );
};

export default LeftRightButtons;
