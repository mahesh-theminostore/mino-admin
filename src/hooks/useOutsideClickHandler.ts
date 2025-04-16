import { RefObject, useEffect } from 'react';

export function useOutsideClickHandler<T extends HTMLElement>(targetRef: RefObject<T | null>, callbackFn: () => void) {
  function handleClick(e: MouseEvent) {
    if (targetRef?.current && !targetRef.current.contains(e.target as Node)) {
      callbackFn();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
