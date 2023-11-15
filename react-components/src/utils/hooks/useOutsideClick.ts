import { useEffect, useRef } from 'react';

export default function useOutsideClick(callback: (e: MouseEvent) => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      ref?.current?.contains(e.target as Node) || callback(e);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
