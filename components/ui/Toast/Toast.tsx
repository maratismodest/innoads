import { useTranslations } from 'next-intl';

import CloseSvg from '@/public/svg/close.svg';
import FireSvg from '@/public/svg/fire.svg';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | undefined;
}

export function Toast({ isOpen, onClose, message }: ToastProps) {
  const t = useTranslations();
  if (!isOpen) {
    return null;
  }
  return (
    <div
      id="toast-default"
      className="fixed left-0 right-0 top-1 z-[1000] mx-auto flex w-full max-w-xs animate-transit items-center rounded-lg bg-white px-2 py-1 shadow ease-in-out dark:bg-gray dark:text-white"
      role="alert"
    >
      <div
        className="text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
        <FireSvg className="size-6" />
        <span className="sr-only">Иконка огня</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message ?? t('Что-то пошло не так')}</div>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-900 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 focus:ring-2 dark:hover:text-white"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={onClose}
      >
        <CloseSvg className="size-4" />
        <span className="sr-only">{t('Закрыть')}</span>
      </button>
    </div>
  );
}
