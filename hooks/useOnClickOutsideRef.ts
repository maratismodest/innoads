import { useEffect, useRef } from 'react';

export default function useOnClickOutsideRef(callback: () => void, initialValue = null) {
  const elementRef = useRef(initialValue);
  useEffect(() => {
    function handler(event: Event) {
      // @ts-ignore
      if (!elementRef.current?.contains(event.target)) {
        callback();
      }
    }

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [callback]);
  return elementRef;
}
