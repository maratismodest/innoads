import React, { Dispatch, SetStateAction, useEffect } from 'react';
import FireSvg from '@/public/svg/fire.svg';
import CloseSvg from '@/public/svg/close.svg';

const Toast = ({
  toast,
  setToast,
}: {
  toast: boolean;
  setToast: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (toast) {
      setTimeout(() => setToast(false), 3000);
    }
  }, [toast]);
  if (!toast) {
    return null;
  }
  return (
    <div
      id="toast-default"
      className="text-gray-500 dark:text-gray-400 dark:bg-gray-800 fixed right-0 top-0 z-[1000] flex w-full max-w-xs items-center rounded-lg bg-white p-4 shadow"
      role="alert"
    >
      <div className="text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
        <FireSvg />
        <span className="sr-only">Иконка огня</span>
      </div>
      <div className="ms-3 text-sm font-normal">Объявление в архиве!</div>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-900 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 focus:ring-2 dark:hover:text-white"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => setToast(false)}
      >
        <CloseSvg />
        <span className="sr-only">Закрыть</span>
      </button>
    </div>
  );
};

export default Toast;
