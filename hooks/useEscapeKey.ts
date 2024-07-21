import { useEffect, useCallback } from 'react';

const useEscapeKey = (callback: () => void): void => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [handleEscKey]);
};

export default useEscapeKey;
